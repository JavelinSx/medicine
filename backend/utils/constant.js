module.exports.JWT_DEV = 'secret'

module.exports.ERRORS_MESSAGE = {
  badRequest: {
    messageUncorrectedData: 'Переданы некорректные данные',
    notFiles: 'Нет файлов для загрузки'
  },
  badAuth: {
    messageNeedAuth: 'Необходима авторизация',
    messageUncorectedRole: 'Нет прав',
    messageUncorrectedData: 'Переданные некорректные данные логин или пароль',
  },
  notFound: {
    messageDefault: 'Запрашиваемый ресурс не найден',
    messageSearchCard: 'Карточка с таким id не найдена',
    messageSearchUser: 'Пользователь с таким id не найден',
    messageSearchUsers: 'Пользователи не найдены',
    messageSearchUserHelp: 'Такой пользователь не найден'
  },
  forbidden: {
    messageDefault: 'Пользователь не имеет достаточно прав для этого действия',
  },
  existConflict: {
    messageDefault: 'Пользователь с таким логин уже существет',
  },
  permissionConfilct: {
    messageDefault: 'Недостаточно прав'
  },
  badFile: {
    messageDefault: 'Ошибка при обработке файлов'
  },
  defautl: {
    messageDefault: 'Ошибка сервера',
  },
};
