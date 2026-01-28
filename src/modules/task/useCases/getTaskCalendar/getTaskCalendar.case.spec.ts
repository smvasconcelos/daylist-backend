import { TaskRepositoryInMemory } from '../../repositories/task.repository.memory';
import { GetTaskCalendarUseCase } from './getTaskCalendar.case';

describe('Get task calendar', () => {
  it('Should return a calendar view structure', async () => {
    const taskRepositoryInMemory = new TaskRepositoryInMemory();
    const getTaskCalendarUseCase = new GetTaskCalendarUseCase(
      taskRepositoryInMemory
    );

    const result = await getTaskCalendarUseCase.execute({
      userId: 'user-1',
      calendarView: 'DAILY',
      date: new Date()
    });

    expect(result).toEqual({
      daily: null,
      weekly: null,
      monthly: null
    });
  });
});
