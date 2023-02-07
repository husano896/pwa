import dayjs from 'dayjs-es';
import { DayjsConverter } from '@shared/DayjsConverter';
import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from './../DateConverter';

@JsonObject('TodoDto')
export class TodoDto {
  @JsonProperty('name', String)
  name: string | null = null;

  @JsonProperty('date', DayjsConverter)
  date: dayjs.Dayjs = null;

  @JsonProperty('dueDate', DayjsConverter, true)
  dueDate?: dayjs.Dayjs = null;

  @JsonProperty('color', String, true)
  color?: string = undefined;

  @JsonProperty('completed', Boolean, true)
  completed?: boolean = undefined;

  IsInProgress() {
    return dayjs().isAfter(this.date) && ((this.dueDate && dayjs().isBefore(this.dueDate)));
  }

  IsInComing() {
    return dayjs().isBefore(this.date);
  }

  /** 是否已過期 */
  IsOverDue() {
    return !this.completed && dayjs().isAfter(this.date) && (!this.dueDate || (this.dueDate && dayjs().isAfter(this.dueDate)));
  }

  IsCompleted() {
    return this.completed;
  }

  /** 取得該類別的差別天數 */
  getCount() {
    if (this.IsInComing()) {
      return this.date.diff(dayjs(), 'day');
    } else if (this.IsInProgress()) {
      return this.dueDate.diff(dayjs(), 'day');
    } else if (this.IsOverDue()) {
      return dayjs().diff(this.dueDate || this.date, 'day');
    }
    return 0;
  }
}
