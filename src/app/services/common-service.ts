export class CommonService {
    static authorizationDataKey = 'authorizationData';
    static rememberMeKey = 'RememberMe';
    static currentLanguageKey = 'CurrentLanguage';
    // static baseUrlWithoutApi = 'http://api-prod-starberry.stg.techable.vn';
    // static cdnUrl = 'http://cdn-prod-starberry.stg.techable.vn/UploadTemp/';

    //static baseUrlWithoutApi = 'https://api.ompalo.com';
    //static cdnUrl = 'https://cdn.ompalo/UploadTemp/';

    static baseUrlWithoutApi = 'http://api-prod-starberry.stg.techable.vn';
    static cdnUrl = 'http://cdn-prod-starberry.stg.techable.vn/UploadTemp/';

    //static baseUrlWithoutApi = 'http://localhost:62503';
    //static cdnUrl = 'http://localhost:37936/UploadTemp/';
    static hostUrl = 'https://ompalo.com';
    static baseUrl = CommonService.baseUrlWithoutApi + '/api/';
    static loginUrl = CommonService.baseUrlWithoutApi + '/token';
    static noActionLike = 0;
    static like = 1;
    static dislike = 2;
    public static BussinessGenericErrorMessageKey = 'Following business rules have failed:';
    static ChangeProfileSubcribeKey = 'ChangeProfileSubcribe';
    static ChangeMyListSubcribeKey = 'ChangeMyListSubcribeKey';
    static ShowPopupAddMyListKey = 'ShowPopupAddMyListKey';
    static ShowPopupAddMyListVideoKey = 'ShowPopupAddMyListVideoKey';
    static ShowPopupShareKey = 'ShowPopupShareKey';
    static ChangeMyListDetailSubcribeKey = 'ChangeMyListDetailSubcribeKey';



    //Show menu Active Key
    static ShowDashboardMenuKey = 'ShowDashboardMenu';
    static ShowBrowseMenuKey = 'ShowBrowseMenuKey';

    static format(str: string, obj: string[]) {
        return str.replace(/\{\s*([^}\s]+)\s*\}/g, (p1) => {
            return obj[p1];
        });
    }

    static isEmail(email: string): boolean {
        const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    static isNullOrEmpty(str: string): boolean {
        if (str === undefined || str == null || str === '') {
            return true;
        }
        return false;
    }

    static addDate(datetime: string, num: number): Date {
        const d = new Date(datetime);
        d.setDate(d.getDate() + num);
        return d;
    }
    static formatTime(datetime: Date): string {
        const minute = datetime.getMinutes();
        let hours = datetime.getHours();
        const minutes: number = minute % 60;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const hoursstr: string = hours < 10 ? '0' + hours.toString() : hours.toString();
        const minutesstr: string = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
        const strTime = hoursstr + ':' + minutesstr + ' ' + ampm;
        return strTime;
    }
    static formatDate(datetime: Date): string {
        const date = datetime.getDate();
        const month = (datetime.getMonth() + 1);
        const datestr = date < 10 ? '0' + date : date;
        const monthstr = month < 10 ? '0' + month : month;
        return monthstr + '/' + datestr + '/' + datetime.getFullYear();
    }
    static formatDateTime(datetime: Date): string {
        const date = datetime.getDate();
        const month = (datetime.getMonth() + 1);
        const datestr = date < 10 ? '0' + date : date;
        const monthstr = month < 10 ? '0' + month : month;

        const minute = datetime.getMinutes();
        let hours = datetime.getHours();
        const minutes: number = minute % 60;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const hoursstr: string = hours < 10 ? '0' + hours.toString() : hours.toString();
        const minutesstr: string = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
        const strTime = hoursstr + ':' + minutesstr + ' ' + ampm;

        return monthstr + '/' + datestr + '/' + datetime.getFullYear() + ' ' + strTime;
    }
    static isValidTime(time: any): boolean {
        const dateReg = /^(1[012]|0[1-9]):[0-5][0-9](\\s)? (AM|PM)+$/;
        if (!dateReg.test(time.toString())) {
            return false;
        }
        return true;
    }
    static isValidDate(str: any): boolean {
        const comp = this.formatDate(new Date(str.toString())).split('/');
        const m = parseInt(comp[0], 10);
        const d = parseInt(comp[1], 10);
        const y = parseInt(comp[2], 10);
        const date = new Date(y, m - 1, d);
        if (date.getFullYear() === y && date.getMonth() + 1 === m && date.getDate() === d) {
            return true;
        }
        return false;
    }
    static findObjectByKey(array: any, key: any, value: any): any {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    }
    static findObjectByMultiKey(array: any, keys: any[], values: any[]): any {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < array.length; i++) {
            let c = 0;
            for (let j = 0; j < keys.length; j++) {
                if (array[i][keys[j]] === values[j]) {
                    c++;
                }
            }
            if (c === keys.length) {
                return array[i];
            }
        }
        return null;
    }
    static countObjectByKey(array: any, key: any, value: any): any {
        let count = 0;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                count++;
            }
        }
        return count;
    }
    static compareDate(startDate: any, endDate: any): boolean {
        const dateOne = new Date(this.formatDate(new Date(startDate.toString())));
        const dateTwo = new Date(this.formatDate(new Date(endDate.toString())));
        if (dateOne >= dateTwo) {
            return false;
        } else {
            return true;
        }

    }
    static compareTime(startTime: any, endTime: any): boolean {
        const timeOne = new Date(this.formatDate(new Date()) + ' ' + this.formatTime(new Date(startTime.toString())));
        const timeTwo = new Date(this.formatDate(new Date()) + ' ' + this.formatTime(new Date(endTime.toString())));
        if (timeOne > timeTwo) {
            return false;
        } else {
            return true;
        }

    }
    static isValidPhone(phone: any): boolean {
        const patt = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}|\d{5}$/);
        return patt.test(phone);
    }

    static convertUtcToLocalDateTimeString(serverdate: any) {
        const date = new Date();
        const offsetms = date.getTimezoneOffset();
        const serverDate = new Date(serverdate);
        return this.formatDateTime(this.convertUTCDateToLocalDate(serverDate, offsetms));
    }
    static convertUTCDateToLocalDate(date: any, offset: number) {
        const d = new Date(date);
        const newDate = new Date(date);
        newDate.setMinutes(d.getMinutes() - offset);
        return newDate;
    }
    static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.floor((Math.random() * 16));
            const v = c === 'x' ? r : (r && 0x3 || 0x8);
            return v.toString(16);
        }).replace(/-/g, '').substr(Math.floor((Math.random() * 24) + 1), 8);
    }

}
