export enum taskTypes {
  TASK = "Task",
  DEVELOPMENT = "Development",
  BUG = "Bug",
  TEST = "Test",
  DEPLOY = "Deploy",
  DOCUMENT = "Document",
}

export const taskTypesOptions: Record<taskTypes, { label: string; color: string }> = {
  [taskTypes.TASK]:
    {
      label: "Задание",
      color: "green"
    },
  [taskTypes.DEVELOPMENT]:
    {
      label: "Разработка",
      color: "lime"
    },
  [taskTypes.BUG]:
    {
      label: "Баг",
      color: "red"
    },
  [taskTypes.TEST]:
    {
    label: "Тестирование",
    color: "yellow"
  },
  [taskTypes.DEPLOY]:
    {
    label: "Деплой",
    color: "orange"
    },
  [taskTypes.DOCUMENT]:
    {
      label: "Документирование",
      color: "blue"
    },
};




