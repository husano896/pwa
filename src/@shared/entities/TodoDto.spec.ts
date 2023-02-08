import { ComponentFixture, TestBed } from '@angular/core/testing';
import dayjs from 'dayjs-es';
import { JsonConvert } from 'json2typescript';

import { TodoDto } from './TodoDto';

describe('TodoDto', () => {

  const converter = new JsonConvert();

  const list: TodoDto[] = converter.deserializeArray([
    // 即將到來
    {
      name: '1', date: dayjs().add(1, 'day')
    },
    // 進行中
    {
      name: '1', date: dayjs(), dueDate: dayjs().add(1, 'day')
    },
    // 已過期
    {
      name: '1', date: dayjs()
    },
    // 已完成
    {
      name: '1', date: dayjs(), completed: true
    }
  ], TodoDto)

  it('即將到來', () => {
    expect(list[0].IsInComing()).toBeTruthy()
    expect(list[1].IsInComing()).toBeFalsy()
    expect(list[2].IsInComing()).toBeFalsy()
    expect(list[3].IsInComing()).toBeFalsy()
  })

  it('正在進行中', () => {
    expect(list[0].IsInProgress()).toBeFalsy()
    expect(list[1].IsInProgress()).toBeTruthy()
    expect(list[2].IsInProgress()).toBeFalsy()
    expect(list[3].IsInProgress()).toBeFalsy()
  })

  it('已過期', () => {
    expect(list[0].IsOverDue()).toBeFalsy()
    expect(list[1].IsOverDue()).toBeFalsy()
    expect(list[2].IsOverDue()).toBeTruthy()
    expect(list[3].IsOverDue()).toBeFalsy()
  })

  it('已完成', () => {
    expect(list[0].IsCompleted()).toBeFalsy()
    expect(list[1].IsCompleted()).toBeFalsy()
    expect(list[2].IsCompleted()).toBeFalsy()
    expect(list[3].IsCompleted()).toBeTruthy()
  })

});
