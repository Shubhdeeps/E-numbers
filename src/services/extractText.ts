import { createWorker } from "tesseract.js";

export async function extractText(imageURL: string) {
  const worker = await createWorker("eng");

  const {
    data: { text },
  } = await worker.recognize(imageURL, { rotateAuto: true });

  await worker.terminate();
  return text;
}
