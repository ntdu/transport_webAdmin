import { Injectable } from '@angular/core';
// import isMatch from 'date-fns/isMatch'
// import { stringToArray } from 'ag-grid-community';

@Injectable(
    { providedIn: 'root' }
)
export class StringHelpers {
    dateToSystemString(date: Date) : string {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let str_month = month < 10 ? '0' + month : '' + month;
        let str_day = day < 10 ? '0' + day : '' + day;
        return year + '-' + str_month + '-' + str_day;
    }
    dateTimeToSystemString(date: Date) : string {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let str_hours = hours < 10 ? '0' + hours : '' + hours;
        let str_minutes = minutes < 10 ? '0' + minutes : '' + minutes;
        return this.dateToSystemString(date) + ' ' + str_hours + ':' + str_minutes;
    }

    dateAndTimeToSystemString(date: Date, time: string): string{
        return this.dateToSystemString(date) + ' ' + time;
    }

    getTime(date: Date) {
        let hours = date.getHours().toString(); 
        let minutes = date.getMinutes().toString();

        if (hours.length == 1) {
            hours = "0" + date.getHours();
        }

        if (minutes.toString().length == 1) {
            minutes = "0" + date.getMinutes();
        }

        return hours + ':' + minutes;
    }

    

    dateFormatWithPad(date: Date) {
        let dd = String(date.getDate()). padStart(2, '0');
        let mm = String(date.getMonth() + 1). padStart(2, '0'); 
        let yyyy = date. getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    //Show date and time
    datetimeFormat(date: Date) {
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        let day = date.getDate().toString();
        let month = (date.getMonth()+1).toString();
        if (hours.length == 1){
            hours = "0" + date.getHours()
        }
        if (minutes.toString().length == 1){
            minutes = "0" + date.getMinutes()
        }
        if (month.length == 1){
            month = "0" + (date.getMonth()+1)
        }
        if (day.length == 1){
            day = "0" + date.getDate()
        }
        return day + '/' + month + '/' + date.getFullYear() + ', ' + hours + ':'+ minutes;
    }
    
    //Show date format
    dateFormat(date: Date) {
        let day = date.getDate().toString();
        let month = (date.getMonth()+1).toString();

        if (month.length == 1){
            month = "0" + (date.getMonth()+1)
        }
        if (day.length == 1){
            day = "0" + date.getDate()
        }
        return day + '/' + month + '/' + date.getFullYear();
    }

    numberFormat(val: Number) {
        var parts = val.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] && (parseInt(parts[1], 10) > 0) ? "." + parts[1] : "");
    }

    //Convert TextMaskNumber --> Number 
    convertTextMaskNumber(val: string) {
        let part = val.split('.');
        let number_parts = part[0].split(',');
        let number_val = '';
        number_parts.forEach(p => {
            number_val += p
        })

        val = (part.length == 1) ? (number_val) : (number_val + '.' + part[1]);
        return parseFloat(val);
    }

    //Get "MM/yyyy"
    getMonth(month: number, year: number): string {
        let next: string;
    
        let next_month: string;
        if (month < 10) {
          next_month = '0' + month.toString();
        } 
        else {
          next_month = month.toString();
        }
        next = next_month + '/' + year;
        return next
    }

    getPreviousMonth(month: number, year: number): string {
        let previous: string;
        let previous_month_str: string;

        if (month == 1) {
            month = 12;
            year--;
        } 
        else {
            month--;
        }

        if (month < 10) {
            previous_month_str = '0' + month.toString();
        } 
        else {
            previous_month_str = month.toString();
        }

        previous = previous_month_str + '/' + year;

        return previous;
    }


    //Chuy???n ?????i c?? d???u th??nh d???ng ko d???u
    changeToSlug(field: string): string {
        let slug: string;

        slug = field.toLowerCase();

        //?????i k?? t??? c?? d???u th??nh kh??ng d???u
        slug = slug.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'a');
        slug = slug.replace(/??|??|???|???|???|??|???|???|???|???|???/gi, 'e');
        slug = slug.replace(/i|??|??|???|??|???/gi, 'i');
        slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'o');
        slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???/gi, 'u');
        slug = slug.replace(/??|???|???|???|???/gi, 'y');
        slug = slug.replace(/??/gi, 'd');
        //X??a c??c k?? t??? ?????t bi???t
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;/gi, '');
        //?????i kho???ng tr???ng th??nh k?? t??? g???ch ngang
        slug = slug.replace(/ /gi, "_");
        //?????i nhi???u k?? t??? g???ch ngang li??n ti???p th??nh 1 k?? t??? g???ch ngang
        //Ph??ng tr?????ng h???p ng?????i nh???p v??o qu?? nhi???u k?? t??? tr???ng
        slug = slug.replace(/\-\-\-\-\-/gi, '_');
        slug = slug.replace(/\-\-\-\-/gi, '_');
        slug = slug.replace(/\-\-\-/gi, '_');
        slug = slug.replace(/\-\-/gi, '_');
        slug = slug.replace(/\-/gi, '_');
        //____
        slug = slug.replace(/\_\_\_\_\_/gi, '_');
        slug = slug.replace(/\_\_\_\_/gi, '_');
        slug = slug.replace(/\_\_\_/gi, '_');
        slug = slug.replace(/\_\_/gi, '_');
        //X??a c??c k?? t??? g???ch ngang ??? ?????u v?? cu???i
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');

        return slug;
    }
}