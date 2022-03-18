import { TransactionNote } from "./TransactionNote.model";

// export interface UploadResponse {
// transaction: string;
// uri: string;
// confirmed_txn_note: TransactionNote;
// file_id: string;
// }

export interface UploadResponse {
  file_added: FileAdded;
  file_hash: string;
  extension: string;
}

export interface FileAdded {
  path: string;
  cid: any;
  size: number;
  mode: number;
}
