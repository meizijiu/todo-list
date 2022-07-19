import MyFetch from './request'
// 查询列表
export const getTodolist = (filterType = '2') => {
  // let controller = new AbortController();
  // setTimeout(() => controller.abort(), timeout);

  // return fetch("/api/todoList/list?filterType=" + filterType, {
  //   signal: controller.signal,
  // });

  return new MyFetch({
    method: 'get',
    url: '/todoList/list',
    params: {
      filterType,
    },
  })
}

// 添加数据
export const addTodolist = (msg, timeStamp) => {
  return new MyFetch({
    method: 'post',
    url: '/todoList/addOne',
    timeout: 5000,
    params: {
      msg,
      timeStamp,
    },
  })
}

// 删除
export const deleteTodolist = id => {
  return new MyFetch({
    method: 'post',
    url: '/todoList/delete',
    timeout: 5000,
    params: {
      id,
    },
  })
}

// 修改
export const updateTodolist = (id, is_finished) => {
  return new MyFetch({
    method: 'post',
    url: '/todoList/update',
    timeout: 5000,
    params: {
      id,
      is_finished: is_finished ? '1' : '0',
    },
  })
}
