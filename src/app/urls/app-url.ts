import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppUrl {

  public static readonly BASE_URL = 'http://localhost:5000/api/';

  public static readonly HOME_PAGE_URL = 'home';

  public static readonly ROUTE = {
    // Example below with passing args to path
    // getUrl: (userId: string, param: string) => `/user/${userId}/${param}`

    getHome: AppUrl.HOME_PAGE_URL,
    getUnits: `units`,
    getLogin: `login`,
    getReportCoopDebt: `report-coop-debt`,
    getReportPackList: `report-pack-list`,
    getReportSupReceivables: `report-supplier-receivables`,
    getReportGrandeOrder: 'report-report-grande-order',
    getReportOrderBySupplier: 'report-order-by-supplier',
    getCoopOrders: 'coop-orders',
    getCoopLastOrder: 'coop-last-order',
    admin: 'admin',
    user: 'user'
  };

}
