// ============ Описание задачи: Демонстрация проблем callback-функций и их решений ============
/*
Чему научит:
- Понимание проблем вложенных callback-функций
- Работа с разными подходами к асинхронному коду
- Обработка ошибок в асинхронных операциях
- Рефакторинг callback-based кода

Применение в реальной разработке:
- Работа с API и базами данных
- Загрузка и обработка данных
- Управление состоянием приложения
- Обработка пользовательских действий
*/

// ============ Базовые асинхронные функции ============
function getEmployee(employeeId, callback) {
    setTimeout(() => {
        const employee = { id: employeeId, name: 'Иван Петров', position: 'Менеджер' };
        callback(null, employee);
    }, 1000);
}

function getDepartment(employeeId, callback) {
    setTimeout(() => {
        const department = { id: 1, name: 'Отдел продаж', head: 'Сергей Иванов' };
        callback(null, department);
    }, 1000);
}

function getProjects(departmentId, callback) {
    setTimeout(() => {
        const projects = [
            { id: 1, name: 'Проект А', deadline: '2025-03-01' },
            { id: 2, name: 'Проект Б', deadline: '2025-04-15' }
        ];
        callback(null, projects);
    }, 1000);
}

// ============ Демонстрация Callback Hell ============
// Проблемы:
// - Глубокая вложенность
// - Сложность обработки ошибок
// - Трудности в поддержке кода
getEmployee(123, (error, employee) => {
    if (error) {
        console.error('Ошибка получения данных сотрудника:', error);
        return;
    }
    console.log('Получены данные сотрудника:', employee);

    getDepartment(employee.id, (error, department) => {
        if (error) {
            console.error('Ошибка получения данных отдела:', error);
            return;
        }
        console.log('Получены данные отдела:', department);

        getProjects(department.id, (error, projects) => {
            if (error) {
                console.error('Ошибка получения проектов:', error);
                return;
            }
            console.log('Получены проекты:', projects);
        });
    });
});

// ============ Решение 1: Промисификация ============
// Преимущества:
// - Улучшенная читаемость кода
// - Цепочки then для последовательных операций
// - Централизованная обработка ошибок
function getEmployeePromise(employeeId) {
    return new Promise((resolve, reject) => {
        getEmployee(employeeId, (error, employee) => {
            if (error) reject(error);
            else resolve(employee);
        });
    });
}

function getDepartmentPromise(employeeId) {
    return new Promise((resolve, reject) => {
        getDepartment(employeeId, (error, department) => {
            if (error) reject(error);
            else resolve(department);
        });
    });
}

function getProjectsPromise(departmentId) {
    return new Promise((resolve, reject) => {
        getProjects(departmentId, (error, projects) => {
            if (error) reject(error);
            else resolve(projects);
        });
    });
}

// ============ Использование Promise ============
getEmployeePromise(123)
    .then(employee => {
        console.log('Сотрудник:', employee.name);
        return getDepartmentPromise(employee.id);
    })
    .then(department => {
        console.log('Отдел:', department.name);
        return getProjectsPromise(department.id);
    })
    .then(projects => {
        console.log('Проекты:', projects.map(p => p.name).join(', '));
    })
    .catch(error => console.error('Произошла ошибка:', error));

// ============ Решение 2: Async/Await ============
// Преимущества:
// - Синхронно-подобный код
// - Простая обработка ошибок
// - Максимальная читаемость
async function getAllData(employeeId) {
    try {
        const employee = await getEmployeePromise(employeeId);
        console.log('Сотрудник:', employee.name);
        
        const department = await getDepartmentPromise(employee.id);
        console.log('Отдел:', department.name);
        
        const projects = await getProjectsPromise(department.id);
        console.log('Проекты:', projects.map(p => p.name).join(', '));
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

// ============ Запуск асинхронной функции ============
getAllData(123);