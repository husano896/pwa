import { JsonObject, JsonProperty } from 'json2typescript';
import { DateConverter } from './../DateConverter';

@JsonObject('TodoDto')
export class TodoDto {
  @JsonProperty('name', String)
  name: string | null = null;

  @JsonProperty('date', DateConverter)
  date: Date | null = null;

  @JsonProperty('dueDate', DateConverter, true)
  dueDate: Date | null = null;

  @JsonProperty('color', String, true)
  color?: string = undefined;

  IsOverDue() {
    return this.dueDate && new Date() > this.dueDate;
  }
}
