import { Request, Response } from "express";
import { HeadObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3 from "../utils/s3";

export const checkfotopersil = async (req: Request, res: Response) => {
  const { filename } = req.params;
  const bucket = process.env.AWS_S3_BUCKET_NAME;
  const prefix = `fotopersil_gorontalo/${filename}`; // tanpa ekstensi

  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix, // akan cocokkan semua file yang diawali "fotopersil_gorontalo/filename"
      MaxKeys: 10,
    });

    const result = await s3.send(listCommand);

    const match = result.Contents?.find((obj) => obj.Key?.match(new RegExp(`^fotopersil_gorontalo/${filename}\\.(jpg|jpeg|png|webp|bmp|gif)$`, "i")));

    if (!match) {
      return res.status(200).json({ exists: false });
    }

    return res.status(200).json({
      exists: true,
      key: match.Key,
      size: match.Size,
      lastModified: match.LastModified,
    });
  } catch (error: any) {
    console.error("ListObjects error:", error);
    return res.status(500).json({ message: "Gagal cek file", error: error.message });
  }
};

export const GetFotoPersil = async (req: Request, res: Response) => {
  try {
    const { nop } = req.params;
    if (!/^\d{18}$/.test(nop)) {
      return res.status(400).json({ message: `Invalid NOP format: ${nop}` });
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME!;
    const prefix = `fotopersil_gorontalo/${nop}_`;

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
      MaxKeys: 5,
    });

    const result = await s3.send(command);

    const imageUrls =
      result.Contents?.map((item) => {
        return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`;
      }) || [];

    if (imageUrls.length === 0) {
      return res.status(200).json({
        code: 200,
        message: "Image empty",
        isEmpty: true,
        imageUrls: [],
      });
    }

    return res.status(200).json({
      code: 200,
      message: "Fetched images from AWS S3 successfully",
      imageUrls,
    });
  } catch (error: any) {
    console.error("Error fetching S3 objects:", error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};
