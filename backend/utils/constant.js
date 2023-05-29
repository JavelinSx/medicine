module.exports.JWT_DEV = 'secret'

module.exports.ERRORS_MESSAGE = {
    badRequest: {
      messageUncorrectedData: 'Переданы некорректные данные',
      notFiles: 'Нет файлов для загрузки'
    },
    badAuth: {
      messageNeedAuth: 'Необходима авторизация',
      messageUncorrectedData: 'Переданные некорректные данные login или password',
    },
    notFound: {
      messageDefault: 'Запрашиваемый ресурс не найден',
      messageSearchCard: 'Карточка с таким id не найден',
      messageSearchUser: 'Пользователь с таким id не найден',
      messageSearchUsers: 'Пользователи не найдены'
    },
    forbidden: {
      messageDefault: 'Пользователь не имеет достаточно прав для этого действия',
    },
    existConflict: {
      messageDefault: 'Пользователь с таким login уже существет',
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
