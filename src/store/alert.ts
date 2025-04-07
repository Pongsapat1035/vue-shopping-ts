import { defineStore } from "pinia";

export const useAlertStore = defineStore("alertStore", {
  state: (): {
    alertState: boolean;
    alertTime: number;
    alertType: string;
    alertMessage: string;
  } => ({
    alertState: false,
    alertTime: 3,
    alertMessage: "",
    alertType: "",
  }),
  actions: {
    toggleAlert(type: string,message: string,  alertTime?: number) {
      this.alertMessage = message;
      this.alertType = type;
      const time: number = alertTime ? alertTime : this.alertTime;
      this.alertState = true;
      setTimeout(() => {
        this.alertState = false;
      }, time * 1000);
    },
  },
});
