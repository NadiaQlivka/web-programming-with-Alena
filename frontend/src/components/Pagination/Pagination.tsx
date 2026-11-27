import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    new Set([
      1,
      2,
      3,
      currentPage,
      totalPages
    ])
  )
    .filter((page) => page <= totalPages)
    .sort((a, b) => a - b);

  return (
    <nav
      className={styles.pagination}
      aria-label="Страницы каталога"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      {pages.map((page, index) => (
        <span key={page} className={styles.item}>
          {index > 0 &&
            page - pages[index - 1] > 1 && (
              <span className={styles.dots}>
                ...
              </span>
            )}

          <button
            type="button"
            className={
              page === currentPage
                ? styles.active
                : ""
            }
            aria-current={
              page === currentPage
                ? "page"
                : undefined
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </span>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Следующая страница"
      >
        →
      </button>
    </nav>
  );
}