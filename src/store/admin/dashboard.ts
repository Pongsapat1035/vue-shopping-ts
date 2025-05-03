import { defineStore } from "pinia";
import { ref, onValue, type DatabaseReference } from "firebase/database";
import { realtimeDB, db } from "../../firebase";
import { collection, getCountFromServer, query, where, getDocs, orderBy, limit } from "firebase/firestore";
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
        orderLists : OrderDetail[]
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
            label: ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan"],
            series1: [45, 52, 38, 45, 19, 33]
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
                    const dashboardData: TotalData = {
                        product: productCount,
                        sale: data.sale,
                        successOrder: data.successOrder,
                        cancelOrder: data.cancelOrder,
                        topProduct: "Mart"
                    }
                    this.totalData = dashboardData
                })
                await this.loadCharData()
                await this.loadLastOrder()
            } catch (error) {
                console.log('load dashboard data error : ', error)
            }
        },
        async loadCharData() {
            try {
                const chartDataRef = ref(realtimeDB, `dashboard/chart/${this.currentMonth}`)
                onValue(chartDataRef, (snapShot) => {
                    const data = snapShot.val();
                    const label = Object.keys(data)
                    const series1 = Object.values(data).map((item: any) => item.sale)
                    // const series2 = Object.values(data).map((item: any) => item.sale)
                    this.chartData = {
                        label,
                        series1,
                    }
                    console.log('check chart data : ', this.chartData)
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
                const recievedOrders :OrderDetail[] = []
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
// citiesRef.orderBy("name", "desc").limit(3);