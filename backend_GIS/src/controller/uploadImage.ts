import { Request, Response } from "express";
import multer from "multer";
import { DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../utils/s3";

const upload = multer({ storage: multer.memoryStorage() });

// Middleware untuk menerima multiple files (maksimal 10 file)
export const uploadFotoMiddleware = upload.array("fotopersil", 3);

export const PostFotoPersil = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const nop = req.params.nop;
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Tidak ada foto yang diupload" });
    }

    if (!/^\d{18}$/.test(nop)) {
      return res.status(400).json({ message: `Invalid NOP format: ${nop}` });
    }

    if (files.length > 3) {
      return res.status(400).json({ message: "Maksimal 3 foto dapat diupload sekaligus" });
    }

    // Step 1: Delete all existing photos for this NOP
    const prefix = `fotopersil_gorontalo/${nop}_`;
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    });
    const listResult = await s3.send(listCommand);

    // Delete existing photos
    if (listResult.Contents && listResult.Contents.length > 0) {
      await Promise.all(
        listResult.Contents.map((item) =>
          s3.send(
            new DeleteObjectCommand({
              Bucket: bucketName,
              Key: item.Key,
            })
          )
        )
      );
    }

    // Step 2: Upload new photos with sequential naming
    const uploadPromises = files.map(async (file, index) => {
      const extension = file.originalname.split(".").pop();
      const paddedNumber = (index + 1).toString();
      const filename = `${nop}_${paddedNumber}.${extension}`;
      const key = `fotopersil_gorontalo/${filename}`;

      const putCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await s3.send(putCommand);

      return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    });

    const imageUrls = await Promise.all(uploadPromises);

    return res.status(200).json({
      message: `${files.length} foto berhasil diupload (foto lama telah diganti)`,
      imageUrls,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};
