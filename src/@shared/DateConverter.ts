import { JsonCustomConvert, JsonConverter } from 'json2typescript';
import dayjs from 'dayjs-es';

// 透過Moment才可以解決IOS該死的-號問題
@JsonConverter
export class DateConverter implements JsonCustomConvert<Date> {
    serialize(date: Date): any {
        return dayjs(date).toISOString();
    }
    deserialize(date: any): Date {
        return dayjs(date).toDate();
    }
}
