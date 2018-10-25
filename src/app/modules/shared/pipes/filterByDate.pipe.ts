import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { News } from 'src/app/models';
import { CONFIG } from 'src/app/config';

@Pipe({
    name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {
    transform(newsList: News[], value: string): News[] {
        let response: News[] = [];

        if (newsList && value) {
            response = newsList.filter((el: News) => {
                const aux: string = moment(el.date.toISOString()).format(CONFIG.dateFormat);
                return aux.includes(value);
            });
        } else if (value === '') {
            response = newsList;
        }

        return response;
    }
}
