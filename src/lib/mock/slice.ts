import type { PageableObject, Slice, SortObject } from "@/types/api";

const sort: SortObject = { empty: true, sorted: false, unsorted: true };

const pageable = (pageNumber: number, pageSize: number): PageableObject => ({
  offset: pageNumber * pageSize,
  sort,
  paged: true,
  pageNumber,
  pageSize,
  unpaged: false,
});

/** 목업 데이터를 Slice<T> 응답 형태로 감싼다 (page/size 쿼리 파라미터 기준). */
export function toSlice<T>(
  all: T[],
  { page = 0, size = 10 }: { page?: number; size?: number } = {}
): Slice<T> {
  const start = page * size;
  const content = all.slice(start, start + size);
  return {
    size,
    content,
    number: page,
    sort,
    numberOfElements: content.length,
    pageable: pageable(page, size),
    first: page === 0,
    last: start + size >= all.length,
    empty: content.length === 0,
  };
}
