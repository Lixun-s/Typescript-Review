/**
 * Create a new pagination
 *
 * @param arr The array to paginate
 * @param itemsPerPage How many items to list per page
 * @param current The page you want to show
 */
 export function paginate<T>(
    arr: T[],
    itemsPerPage: number,
    current = 1
  ): PaginationResult<T> {
    const maxPages = Math.ceil(arr.length / itemsPerPage);
    if (current < 1 || current > maxPages || current === 0) {
      current = maxPages;
    }
  
    const page = arr.slice((current - 1) * itemsPerPage, current * itemsPerPage);
    return {
      current,
      max: maxPages,
      page
    };
  }
  
  interface PaginationResult<T> {
    current: number;
    max: number;
    page: T[];
  }