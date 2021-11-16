import Dexie from 'dexie'  //indexed dbのライブラリ

//型宣言
export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

const database = new Dexie('markdown-editor')  //インスタンス作成
database.version(1).stores({ memos: '&datetime' })  //テーブル、インデックス名の指定
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')  //テーブルクラスの取得

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString()  //日付取得、フォーマット
  await memos.put({ datetime, title, text })  //保存
}

const NUM_PER_PAGE: number = 10  //1ページに表示する記事の数

export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count()  //保存されている記事の数
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)  //ページ数
  return pageCount > 0 ? pageCount : 1
}

export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE  //表示するページの最初の記事の位置
  return memos.orderBy('datetime')
              .reverse()
              .offset(offset)  //取得する開始位置
              .limit(NUM_PER_PAGE)  //取得数
              .toArray()  //配列化
}