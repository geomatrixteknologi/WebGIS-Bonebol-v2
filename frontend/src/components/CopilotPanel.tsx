/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useAICopilot, ChatMessage } from "@/contexts/AICopilotContext";
import { Send, X, Trash2, Bot, User, Sparkles, Zap, Maximize2, Minimize2, HelpCircle, Navigation, Target, FileDown, ListChecks, AlertTriangle, Search, MapPin } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// --- Number / Rupiah formatter for Copilot tables ---

/**
 * Parse a number string that may be in Indonesian (1.000.000,50) or
 * US (1,000,000.50) convention. Returns null if the string is not numeric
 * or looks like an identifier (e.g. NOP code with many dotted segments).
 */
function parseAmbiguousNumber(raw: string): number | null {
  const s = raw.trim();
  if (!/^-?[\d.,]+$/.test(s)) return null;

  const dotCount = (s.match(/\./g) || []).length;
  const commaCount = (s.match(/,/g) || []).length;

  // Looks like an identifier: many dotted segments (e.g. NOP 64.06.010.001...)
  if (dotCount >= 2 && commaCount === 0) {
    const segments = s.split(".");
    const nonThousand = segments.slice(1).some((seg) => seg.length !== 3);
    if (nonThousand) return null;
  }

  let normalized = s;
  if (dotCount > 0 && commaCount > 0) {
    // Rightmost separator is the decimal mark
    const lastDot = s.lastIndexOf(".");
    const lastComma = s.lastIndexOf(",");
    if (lastComma > lastDot) {
      // Indonesian: dots are grouping, comma is decimal
      normalized = s.replace(/\./g, "").replace(",", ".");
    } else {
      // US: commas are grouping, dot is decimal
      normalized = s.replace(/,/g, "");
    }
  } else if (dotCount > 1) {
    // Multiple dots → Indonesian grouping
    normalized = s.replace(/\./g, "");
  } else if (commaCount > 1) {
    // Multiple commas → US grouping
    normalized = s.replace(/,/g, "");
  } else if (commaCount === 1) {
    const [, after] = s.split(",");
    // 3 digits after comma → grouping; else treat as decimal
    normalized = after.length === 3 ? s.replace(",", "") : s.replace(",", ".");
  } else if (dotCount === 1) {
    const [, after] = s.split(".");
    // 3 digits after dot → Indonesian grouping; else already US decimal
    normalized = after.length === 3 ? s.replace(".", "") : s;
  }

  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function formatUsNumber(n: number): string {
  // Comma grouping, dot decimal, up to 4 fraction digits to avoid silly trailing zeros.
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

function formatRupiah(n: number): string {
  return `Rp ${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

/** Reformat a single text token in a table cell. Leaves non-numeric text alone.
 * When `asRupiah` is true, numeric tokens are formatted as currency regardless
 * of whether they had an explicit "Rp" prefix. */
function reformatNumericText(text: string, asRupiah = false): string {
  const trimmed = text.trim();
  if (!trimmed) return text;

  // Rupiah cell (explicit prefix)
  const rp = trimmed.match(/^Rp\.?\s*(-?[\d.,]+)$/i);
  if (rp) {
    const n = parseAmbiguousNumber(rp[1]);
    if (n !== null) return formatRupiah(n);
  }

  // Percentage cell
  const pct = trimmed.match(/^(-?[\d.,]+)\s*%$/);
  if (pct) {
    const n = parseAmbiguousNumber(pct[1]);
    if (n !== null) {
      return `${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`;
    }
  }

  // Plain number
  if (/^-?[\d.,]+$/.test(trimmed)) {
    const n = parseAmbiguousNumber(trimmed);
    if (n !== null && (asRupiah || Math.abs(n) >= 1000 || /[.,]/.test(trimmed))) {
      return asRupiah ? formatRupiah(n) : formatUsNumber(n);
    }
  }

  return text;
}

/** Extract plain text content from a React node tree (for header sniffing). */
function extractNodeText(node: React.ReactNode): string {
  if (node == null || node === false) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractNodeText).join("");
  if (React.isValidElement(node)) {
    return extractNodeText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

/** Inspect a <table> children tree and return the 0-based column indices whose
 * header suggests Rupiah currency (e.g. "Total Tagihan (Rp)", "Pokok Rupiah"). */
function detectRupiahColumns(tableChildren: React.ReactNode): Set<number> {
  const rupiahCols = new Set<number>();
  const ths: React.ReactElement[] = [];
  const walk = (n: React.ReactNode) => {
    if (Array.isArray(n)) return n.forEach(walk);
    if (!React.isValidElement(n)) return;
    if ((n.type as unknown) === "th") {
      ths.push(n);
      return;
    }
    walk((n.props as { children?: React.ReactNode }).children);
  };
  walk(tableChildren);
  ths.forEach((th, idx) => {
    const text = extractNodeText(th).toLowerCase();
    if (/\(rp\)|\brupiah\b|\btagihan\b|\bpokok\b|\bdenda\b|\brealisasi\b|\btarget\b/.test(text)) {
      rupiahCols.add(idx);
    }
  });
  return rupiahCols;
}

/** Recursively format string leaves inside a cell, preserving React element
 * wrappers like <strong> / <em>. */
function transformCellContent(node: React.ReactNode, asRupiah: boolean, keyPrefix = "c"): React.ReactNode {
  if (typeof node === "string") return reformatNumericText(node, asRupiah);
  if (typeof node === "number") return reformatNumericText(String(node), asRupiah);
  if (Array.isArray(node)) {
    return node.map((c, i) => <React.Fragment key={`${keyPrefix}-${i}`}>{transformCellContent(c, asRupiah, `${keyPrefix}-${i}`)}</React.Fragment>);
  }
  if (React.isValidElement(node)) {
    const p = node.props as { children?: React.ReactNode };
    return React.cloneElement(node, node.props as React.Attributes, transformCellContent(p.children, asRupiah, keyPrefix));
  }
  return node;
}

/** Walk <table> children; within <tbody> rows, transform td content using
 * per-column Rupiah hints derived from the header. */
function transformTableTree(node: React.ReactNode, rupiahCols: Set<number>, inBody: boolean, keyPrefix = "t"): React.ReactNode {
  if (typeof node === "string" || typeof node === "number") return node;
  if (Array.isArray(node)) {
    return node.map((c, i) => <React.Fragment key={`${keyPrefix}-${i}`}>{transformTableTree(c, rupiahCols, inBody, `${keyPrefix}-${i}`)}</React.Fragment>);
  }
  if (!React.isValidElement(node)) return node;

  const type = node.type as unknown;
  const props = node.props as { children?: React.ReactNode };

  if (type === "tbody") {
    return React.cloneElement(node, node.props as React.Attributes, transformTableTree(props.children, rupiahCols, true, keyPrefix));
  }

  if (type === "tr" && inBody) {
    const cells = React.Children.toArray(props.children);
    const transformed = cells.map((cell, colIdx) => {
      if (!React.isValidElement(cell)) return cell;
      const cellProps = cell.props as { children?: React.ReactNode };
      const isRupiah = rupiahCols.has(colIdx);
      return React.cloneElement(cell, cell.props as React.Attributes, transformCellContent(cellProps.children, isRupiah, `cell-${colIdx}`));
    });
    return React.cloneElement(node, node.props as React.Attributes, transformed);
  }

  return React.cloneElement(node, node.props as React.Attributes, transformTableTree(props.children, rupiahCols, inBody, keyPrefix));
}

/** Expandable table — renders inline, with an "expand" button that opens the
 * table in a centered overlay dialog so users can see the full width without
 * squinting at the 420px panel. */
const ExpandableTable: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const expandedTableRef = useRef<HTMLTableElement>(null);

  // Transform cells once: detect Rupiah columns from header, then reformat
  // numeric leaves inside tbody cells. Used for both inline and overlay view.
  const formattedChildren = useMemo(() => {
    const rupiahCols = detectRupiahColumns(children);
    return transformTableTree(children, rupiahCols, false);
  }, [children]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll + close on Esc while the overlay is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const handleDownloadExcel = async () => {
    const tableEl = expandedTableRef.current;
    if (!tableEl) return;
    // Dynamic import keeps xlsx out of the initial bundle — only loaded when
    // the user actually clicks download.
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.table_to_book(tableEl, { sheet: "Tabel" });
    const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    XLSX.writeFile(wb, `copilot-tabel-${ts}.xlsx`);
  };

  // Overlay is rendered via portal to document.body so it escapes the
  // Copilot panel's transformed/positioned container and truly covers the
  // full viewport.
  const overlay = isOpen ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-150" onClick={() => setIsOpen(false)} role="dialog" aria-modal="true">
      <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-[95vw] max-h-[92vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2 text-slate-200">
            <Maximize2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold">Tampilan Tabel</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadExcel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-100 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 hover:border-emerald-500/50 transition"
              title="Unduh sebagai file Excel"
              aria-label="Unduh Excel"
            >
              <FileDown className="w-4 h-4" />
              <span>Unduh Excel</span>
            </button>
            <button type="button" onClick={() => setIsOpen(false)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition" title="Tutup" aria-label="Tutup">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 copilot-scroll">
          <div className="copilot-markdown copilot-markdown--expanded">
            <table ref={expandedTableRef} {...props}>
              {formattedChildren}
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="relative group/table">
        <table {...props}>{formattedChildren}</table>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute top-1 right-1 p-1.5 rounded-md bg-slate-900/90 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 opacity-60 group-hover/table:opacity-100 transition z-10 shadow-lg"
          title="Perbesar tabel"
          aria-label="Perbesar tabel"
        >
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
};

/** Shared ReactMarkdown overrides for MessageBubble (module-level to avoid per-render re-creation).
 * ExpandableTable handles numeric cell reformatting internally (column-aware),
 * so td/th overrides are no longer needed. */
const MESSAGE_MARKDOWN_COMPONENTS = {
  table: ExpandableTable,
};

type Suggestion = { label: string; prompt: string; send: boolean };

const SUGGESTED_QUESTIONS: Record<"payment_status" | "overdue_status", Suggestion[]> = {
  payment_status: [
    { label: "Distribusi per kelas tanah", prompt: "Tampilkan distribusi pembayaran objek pajak per kelas tanah.", send: true },
    { label: "Collection rate per rentang NJOP", prompt: "Bagaimana collection rate pembayaran per rentang nilai NJOP?", send: true },
    { label: "5 objek pajak terbesar", prompt: "Tunjukkan 5 objek pajak dengan nilai pajak (PBB) terbesar tahun ini.", send: true },
    { label: "Cari wajib pajak…", prompt: "Tampilkan objek pajak milik wajib pajak bernama ", send: false },
    { label: "Riwayat 1 NOP…", prompt: "Tampilkan riwayat pembayaran NOP ", send: false },
  ],
  overdue_status: [
    { label: "Tunggakan per kelas tanah", prompt: "Tampilkan distribusi tunggakan per kelas tanah.", send: true },
    { label: "Tunggakan per rentang NJOP", prompt: "Rentang nilai NJOP mana yang menyumbang tunggakan terbesar?", send: true },
    { label: "Cluster tunggakan terparah", prompt: "Tunjukkan cluster tunggakan paling parah.", send: true },
    { label: "Penunggak milik WP…", prompt: "Tampilkan objek pajak menunggak milik wajib pajak bernama ", send: false },
    { label: "Riwayat tunggakan 1 NOP…", prompt: "Sejak tahun berapa objek pajak ini menunggak? NOP ", send: false },
  ],
};

const CopilotPanel: React.FC = () => {
  const { isCopilotOpen, closeCopilot, messages, isLoading, isBriefingLoading, queuedCount, currentBriefing, sendMessage, clearSession, mapContext } = useAICopilot();

  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll only when a new chat message is appended. Briefings live in
  // the dedicated "Konteks Peta Terbaru" section above and don't enter
  // `messages`, so they won't yank users to the bottom.
  const prevMessageCountRef = useRef(messages.length);
  useEffect(() => {
    if (messages.length > prevMessageCountRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessageCountRef.current = messages.length;
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isCopilotOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isCopilotOpen]);

  // Expand panel toggle
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const msg = inputValue;
    setInputValue("");
    await sendMessage(msg);
  };

  const suggestions: Suggestion[] = mapContext
    ? SUGGESTED_QUESTIONS[mapContext.map_type as "payment_status" | "overdue_status"] ?? []
    : [];

  const handleSuggestion = async (s: Suggestion) => {
    if (!mapContext || isLoading) return;
    if (s.send) {
      await sendMessage(s.prompt);
    } else {
      setInputValue(s.prompt);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  // Reuse the shared ExpandableTable which handles column-aware numeric
  // reformatting (Rupiah columns become "Rp 1,000,000"; others get comma
  // thousand separators).
  const markdownComponents = MESSAGE_MARKDOWN_COMPONENTS;

  const getMapTypeLabel = () => {
    if (!mapContext) return "AI Copilot";
    return mapContext.map_type === "payment_status" ? "Copilot • Pembayaran" : "Copilot • Tunggakan";
  };

  if (!isCopilotOpen) return null;

  return (
    <div
      className={`fixed transition-all duration-500 ease-out z-[1100] flex flex-col bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 
      ${isExpanded ? "bottom-6 left-24 w-[600px] h-[calc(100vh-48px)]" : "bottom-24 left-24 w-[420px] h-[650px] max-h-[calc(100vh-120px)]"}`}
    >
      {isHelpOpen && (
        <HelpModal
          onClose={() => setIsHelpOpen(false)}
          onTryPrompt={(p) => {
            setIsHelpOpen(false);
            setInputValue(p);
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
        />
      )}

      {/* Premium Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent opacity-50 rounded-t-2xl"></div>
        <div className="flex items-center gap-2.5 relative z-10 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl blur shadow-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative z-10 border border-white/20">
              <Bot className="w-4 h-4 text-white drop-shadow-md" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 tracking-wide truncate leading-tight">{getMapTypeLabel()}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <p className="text-[11px] font-medium text-slate-300 truncate">{mapContext ? `Tahun ${mapContext.year}` : "Pilih layer peta"}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-0.5 relative z-10 flex-shrink-0">
          <button onClick={() => setIsHelpOpen(true)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-300 hover:bg-white/10 transition-all duration-200" title="Bantuan — daftar fitur Copilot">
            <HelpCircle className="w-4 h-4" />
          </button>
          <button onClick={toggleExpand} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200" title={isExpanded ? "Perkecil panel" : "Perbesar panel"}>
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button onClick={clearSession} className="p-1.5 rounded-lg text-slate-400 hover:text-pink-400 hover:bg-white/10 transition-all duration-200" title="Hapus percakapan">
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-white/10 mx-0.5"></div>
          <button onClick={closeCopilot} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/20 transition-all duration-200" title="Tutup">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 copilot-scroll">
        {/* Briefing section — rendered while loading (skeleton) or when content exists. */}
        {(isBriefingLoading || currentBriefing) && (
          <div className="bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-purple-500/10 border border-blue-400/20 rounded-xl p-4 shadow-inner relative overflow-hidden backdrop-blur-sm group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-2 mb-3 relative z-10 border-b border-blue-500/20 pb-2">
              <Zap className={`w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] ${isBriefingLoading ? "animate-pulse" : ""}`} />
              <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">Konteks Peta Terbaru</span>
              {isBriefingLoading && (
                <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-blue-300/80">
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1 h-1 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1 h-1 bg-blue-300 rounded-full animate-bounce"></span>
                  </span>
                  <span className="uppercase tracking-wider">Memuat</span>
                </span>
              )}
            </div>
            <div className="copilot-markdown text-sm text-slate-300 font-light leading-relaxed relative z-10">
              {isBriefingLoading && !currentBriefing ? (
                <div className="space-y-2 animate-pulse" aria-label="Memuat briefing">
                  <div className="h-3 bg-white/10 rounded w-11/12"></div>
                  <div className="h-3 bg-white/10 rounded w-10/12"></div>
                  <div className="h-3 bg-white/10 rounded w-8/12"></div>
                  <div className="h-3 bg-white/10 rounded w-9/12"></div>
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {currentBriefing ?? ""}
                </ReactMarkdown>
              )}
            </div>
          </div>
        )}

        {/* Empty state */}
        {messages.length === 0 && !currentBriefing && !isBriefingLoading && (
          <div className="flex flex-col items-center justify-center h-[80%] text-center px-6 animate-in fade-in duration-700">
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="w-20 h-20 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center shadow-2xl relative z-10 backdrop-blur-md">
                <Sparkles className="w-10 h-10 text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
              </div>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2 tracking-tight">Geotax Intellect</h4>
            <p className="text-sm text-slate-400 leading-relaxed max-w-[280px]">{mapContext ? "Tanyakan apa saja tentang data peta yang sedang ditampilkan." : "Aktifkan layer peta terlebih dahulu untuk memulai percakapan."}</p>
            {mapContext && (
              <div className="mt-8 flex flex-col gap-2 w-full">
                {suggestions
                  .filter((s) => s.send)
                  .map((s) => (
                    <button
                      key={s.label}
                      onClick={() => handleSuggestion(s)}
                      disabled={isLoading}
                      className="text-xs bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 py-2.5 px-4 rounded-xl text-left transition-all hover:scale-[1.02] disabled:opacity-40"
                    >
                      {s.prompt}
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Chat messages — skip empty streaming placeholders so loading dots show */}
        {messages.map((msg) => (msg.isStreaming && msg.content === "" ? null : <MessageBubble key={msg.id} message={msg} />))}

        {/* Loading indicator — show bouncing dots while assistant reply is empty */}
        {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "assistant" && messages[messages.length - 1]?.content === "" && (
          <div className="flex items-center gap-3 px-1 py-2 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {mapContext && messages.length === 0 && suggestions.length > 0 && (
        <div className="px-4 pt-3 pb-1 border-t border-white/5 bg-slate-900/40">
          <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Coba tanyakan
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSuggestion(s)}
                disabled={isLoading}
                className="text-[11px] bg-white/5 border border-white/10 hover:bg-blue-500/15 hover:border-blue-400/40 text-slate-300 hover:text-blue-100 px-2.5 py-1.5 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                title={s.send ? "Kirim pertanyaan ini" : "Lengkapi nama/NOP lalu kirim"}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 bg-slate-900/90 border-t border-white/10 backdrop-blur-xl relative">
        {queuedCount > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] text-amber-300/90 mb-2 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {queuedCount} pesan menunggu giliran — akan dikirim setelah jawaban ini selesai.
          </div>
        )}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
          <div className="relative bg-[#0b1120] border border-white/10 rounded-xl pl-3 pr-14 py-2 focus-within:border-white/20 transition-colors shadow-inner">
            <textarea
              ref={inputRef as any}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={
                !mapContext
                  ? "Aktifkan layer peta..."
                  : isLoading
                    ? "Ketik pesan berikutnya (akan dikirim setelah jawaban selesai)..."
                    : "Tanya copilot..."
              }
              disabled={!mapContext}
              maxLength={1000}
              rows={Math.min(Math.max(inputValue.split("\n").length, 2), 5)}
              className="block w-full bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed resize-none leading-relaxed copilot-scroll min-h-[2.5rem]"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || !mapContext}
              className="absolute right-2 bottom-2 p-2.5 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md disabled:active:scale-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-3 px-1 font-medium">
          <span className="flex items-center gap-1">
            <Bot className="w-3 h-3 text-blue-500" /> AI Geotax Intelligence
          </span>
          <span>Shift + Enter untuk baris baru</span>
        </div>
      </div>
    </div>
  );
};

// --- Message Bubble Component ---

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg relative overflow-hidden ${isUser ? "bg-gradient-to-br from-blue-400 to-cyan-500" : "bg-gradient-to-br from-indigo-500 to-purple-600"}`}>
        <div className="absolute inset-0 bg-white/20"></div>
        {isUser ? <User className="w-4 h-4 text-white relative z-10" /> : <Bot className="w-4 h-4 text-white relative z-10" />}
      </div>

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[82%] min-w-0`}>
        <div
          className={`px-4 py-3 shadow-md overflow-hidden max-w-full ${
            isUser ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm border border-blue-500/50" : "bg-white/5 backdrop-blur-md text-slate-200 rounded-2xl rounded-tl-sm border border-white/10"
          }`}
        >
          {isUser ? (
            <div className="text-sm whitespace-pre-wrap leading-relaxed font-light break-words">{message.content}</div>
          ) : (
            <div className="copilot-markdown text-sm leading-relaxed font-light min-w-0 max-w-full">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={MESSAGE_MARKDOWN_COMPONENTS}>
                {message.content}
              </ReactMarkdown>
              {message.isStreaming && <span className="inline-block w-1.5 h-3.5 bg-blue-400/80 ml-1 animate-pulse rounded-full align-middle mb-0.5" />}
            </div>
          )}
        </div>
        <span className="text-[10px] text-slate-500 mt-1.5 font-medium px-1">{message.timestamp.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
};

// --- Help Modal ---

type HelpItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  examples: string[];
  accent: string;
};

const HELP_SECTIONS: { group: string; items: HelpItem[] }[] = [
  {
    group: "Otomatis",
    items: [
      {
        icon: Zap,
        title: "Briefing Otomatis",
        desc: "Ringkasan kondisi wilayah muncul otomatis saat layer Pembayaran / Tunggakan diaktifkan.",
        examples: [],
        accent: "text-amber-300",
      },
      {
        icon: Sparkles,
        title: "Highlight Proaktif",
        desc: "Wilayah dengan tingkat bayar terendah di-highlight otomatis di peta saat briefing muncul.",
        examples: [],
        accent: "text-purple-300",
      },
    ],
  },
  {
    group: "Navigasi Peta",
    items: [
      {
        icon: Navigation,
        title: "Navigasi ke Wilayah",
        desc: "Pindahkan kamera peta ke kecamatan/kelurahan tertentu.",
        examples: ["Navigasi ke kecamatan Muara Pahu", "Zoom ke Damai"],
        accent: "text-blue-300",
      },
      {
        icon: Target,
        title: "Zoom ke Cluster Tunggakan",
        desc: "Fokus pada area dengan tingkat keparahan tunggakan tertinggi.",
        examples: ["Tunjukkan cluster tunggakan paling parah", "Zoom ke hotspot kritis"],
        accent: "text-red-300",
      },
    ],
  },
  {
    group: "Tanya Data",
    items: [
      {
        icon: Search,
        title: "Query Pembayaran",
        desc: "Tanya tingkat pembayaran per wilayah atau tahun.",
        examples: ["Kecamatan mana tingkat bayarnya paling rendah tahun 2025?", "Bagaimana perbandingan pembayaran 2024 vs 2025?"],
        accent: "text-emerald-300",
      },
      {
        icon: MapPin,
        title: "Detail Penunggak",
        desc: "Tanya tentang penunggak, denda, dan pola tunggakan.",
        examples: ["Siapa penunggak terbesar di kecamatan Long Iram?", "Tampilkan detail NOP 64.06.010.001.000.0001.0"],
        accent: "text-cyan-300",
      },
      {
        icon: AlertTriangle,
        title: "Alert NOP Kritis",
        desc: "Temukan NOP dengan tunggakan di atas ambang tahun tertentu.",
        examples: ["NOP mana yang nunggak lebih dari 5 tahun?"],
        accent: "text-orange-300",
      },
    ],
  },
  {
    group: "Export & Prioritas",
    items: [
      {
        icon: FileDown,
        title: "Export Pembayaran",
        desc: "Dapatkan saran filter dan daftar wilayah pembayaran rendah.",
        examples: ["Export daftar wilayah bayar rendah tahun 2025"],
        accent: "text-indigo-300",
      },
      {
        icon: ListChecks,
        title: "Daftar Prioritas Penagihan",
        desc: "Buat daftar prioritas penagihan berbasis severity.",
        examples: ["Buatkan daftar prioritas penagihan", "Daftar kolektibilitas kritis"],
        accent: "text-fuchsia-300",
      },
    ],
  },
];

const HelpModal: React.FC<{ onClose: () => void; onTryPrompt: (p: string) => void }> = ({ onClose, onTryPrompt }) => {
  return (
    <div className="absolute inset-0 z-[1200] flex items-stretch bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex-1 flex flex-col m-2 rounded-2xl bg-[#0f172a]/95 border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white">Bantuan Copilot</h4>
            <p className="text-[11px] text-slate-400">Apa saja yang bisa AI lakukan untukmu</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors" title="Tutup">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 copilot-scroll">
          {HELP_SECTIONS.map((section) => (
            <div key={section.group}>
              <h5 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2 px-1">{section.group}</h5>
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-xl bg-white/[0.03] border border-white/10 p-3 hover:border-white/20 transition-colors">
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 flex-shrink-0 ${item.accent}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h6 className="text-xs font-semibold text-slate-100">{item.title}</h6>
                          <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{item.desc}</p>
                          {item.examples.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {item.examples.map((ex) => (
                                <button
                                  key={ex}
                                  onClick={() => onTryPrompt(ex)}
                                  className="text-[10px] bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/20 hover:border-blue-400/40 text-blue-200 px-2 py-1 rounded-md transition-all"
                                  title="Coba prompt ini"
                                >
                                  “{ex}”
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <p className="text-[10px] text-slate-500 text-center pt-2 pb-1">Tip: klik contoh prompt untuk otomatis mengisi kolom chat.</p>
        </div>
      </div>
    </div>
  );
};

export default CopilotPanel;
