import { MongoClient } from "mongodb";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

// This is necessary to make the TypeScript compiler recognize the file as a module.
export {};
