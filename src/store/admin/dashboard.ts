import { defineStore } from "pinia";
import { ref, onValue } from "firebase/database";
import { realtimeDB, db } from "../../firebase";
import { collection, getCountFromServer, query, getDocs, orderBy, limit } from "firebase/firestore";
import type { OrderDetail } from "../../types";

interface TotalData {
    product: number,
    sale: number,
    successOrder: number,
    cancelOrder: number,
    topProduct: string
}
interface ChartData {
    label: string[]
    series1: number[]
}
export const useAdminDashboard = defineStore("adminDashboardStore", {
    state: (): {
        totalData: TotalData,
        selectedMonth: string,
        chartData: ChartData,
        orderLists: OrderDetail[]
    } => ({
        totalData: {
            product: 0,
            sale: 0,
            successOrder: 0,
            cancelOrder: 0,
            topProduct: "Mart"
        },
        selectedMonth: 'asd',
        chartData: {
            label: [],
            series1: []
        },
        orderLists: []
    }),
    getters: {
        currentMonth() {
            const currentMonth = new Date().toLocaleDateString("en-US", { month: 'short', year: 'numeric' })
            return currentMonth
        }
    },
    actions: {
        async loadDashboard() {
            try {
                const docRef = collection(db, "products")
                const productSnap = await getCountFromServer(docRef)
                const productCount = productSnap.data().count
                const dashboardRef = ref(realtimeDB, "dashboard/total")

                onValue(dashboardRef, (snapShot) => {
                    const data = snapShot.val();
                    if (data) {
                        const dashboardData: TotalData = {
                            product: productCount,
                            sale: data.sale,
                            successOrder: data.successOrder,
                            cancelOrder: data.cancelOrder,
                            topProduct: "Mart"
                        }
                        this.totalData = dashboardData
                    }
                })
                const bestSellerRef = ref(realtimeDB, "dashboard/bestSeller")
                onValue(bestSellerRef, (snapShot) => {
                    const data = snapShot.val();
                    if (data) {
                        this.totalData.topProduct = data.productName
                    }
                })
                await this.loadChartData()
                await this.loadLastOrder()
            } catch (error) {
                console.log('load dashboard data error : ', error)
            }
        },
        async loadChartData() {
            try {
                const chartDataRef = ref(realtimeDB, `dashboard/chart/${this.currentMonth}`)
                onValue(chartDataRef, (snapShot) => {
                    const data = snapShot.val();
                    if (data) {
                        const label = Object.keys(data)
                        const series1 = Object.values(data).map((item: any) => item.sale)
                        this.chartData = {
                            label,
                            series1,
                        }
                        console.log('check chart data : ', this.chartData)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        async loadLastOrder() {
            try {
                const orderRef = collection(db, "orders")
                const orderQuery = query(orderRef, orderBy("createdDate", "desc"), limit(10))
                const orderSnap = await getDocs(orderQuery)
                const recievedOrders: OrderDetail[] = []
                orderSnap.forEach(order => {
                    console.log(order.data())
                    const orderData = order.data()

                    const options = {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                    };
                    const date = orderData.createdDate.toDate().toLocaleDateString("en-us", options)
                    orderData.createdDate = date
                    orderData.id = order.id;
                    recievedOrders.push(orderData as OrderDetail)
                })
                this.orderLists = recievedOrders

            } catch (error) {
                console.log(error)
            }
        }
    }
});
