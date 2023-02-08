import { JsonObject, JsonProperty } from "json2typescript";
import { TodoDto } from "./TodoDto";

@JsonObject('TodoSaveDto')
export class TodoSaveDto  implements ITodoSave{

    /** 更新時間 */
    @JsonProperty('time', Number)
    time: number = null;

    // Date格式他會自動轉成Firebase自有的 只好用成number...
    @JsonProperty('lastSaveTime', Number)
    lastSaveTime?: number;

    /** 儲存的項目 */
    @JsonProperty('items', [TodoDto], true)
    items?: Array<TodoDto> = [];
}

export interface ITodoSave {
    time: number
    lastSaveTime?: number;
    items?: Array<any>;
}