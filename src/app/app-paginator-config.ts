import {MatPaginatorIntl} from '@angular/material/paginator';

export function AppPaginatorConfig(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Na stronie:';
  paginatorIntl.nextPageLabel = 'Następna strona';
  paginatorIntl.previousPageLabel = 'Poprzednia strona';
  paginatorIntl.firstPageLabel = 'Pierwsza strona';
  paginatorIntl.lastPageLabel = 'Ostatnia strona';

  return paginatorIntl;
}
