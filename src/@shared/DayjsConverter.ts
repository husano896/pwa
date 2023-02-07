import { JsonCustomConvert, JsonConverter } from 'json2typescript'
import dayjs from 'dayjs-es'

// 透過Moment才可以解決IOS該死的-號問題
@JsonConverter
export class DayjsConverter implements JsonCustomConvert<dayjs.Dayjs> {
  serialize(date: dayjs.Dayjs): string {
    return dayjs(date).toISOString()
  }

  deserialize(date: any): dayjs.Dayjs {
    return dayjs(date)
  }
}
