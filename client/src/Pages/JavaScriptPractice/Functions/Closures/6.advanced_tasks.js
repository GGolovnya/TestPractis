// ============ Продвинутые задачи на замыкания ============

// 1. Создание системы событий с использованием замыканий
function createEventSystem() {
    const listeners = new Map();
    
    return {
        on(event, callback) {
            if (!listeners.has(event)) {
                listeners.set(event, new Set());
            }
            listeners.get(event).add(callback);
            
            // Возвращаем функцию для удаления слушателя
            return () => {
                listeners.get(event).delete(callback);
            };
        },
        
        emit(event, data) {
            const eventListeners = listeners.get(event);
            if (eventListeners) {
                eventListeners.forEach(callback => callback(data));
            }
        }
    };
}

// Пример использования системы событий
const events = createEventSystem();
const unsubscribe = events.on('userLogin', (user) => {
    console.log('User logged in:', user);
});
events.emit('userLogin', { id: 1, name: 'John' });
unsubscribe(); // Отписываемся от события

// 2. Создание функции для управления состоянием
function createState(initialState = {}) {
    let state = { ...initialState };
    const listeners = new Set();
    
    return {
        getState() {
            return { ...state };
        },
        
        setState(newState) {
            state = { ...state, ...newState };
            listeners.forEach(listener => listener(state));
        },
        
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };
}

// Пример использования управления состоянием
const store = createState({ count: 0 });
store.subscribe((state) => console.log('State updated:', state));
store.setState({ count: 1 });

// 3. Создание системы middleware
function createMiddlewareSystem() {
    const middlewares = [];
    
    return {
        use(middleware) {
            middlewares.push(middleware);
        },
        
        execute(context) {
            return middlewares.reduce((promise, middleware) => {
                return promise.then(() => middleware(context));
            }, Promise.resolve());
        }
    };
}

// Пример использования системы middleware
const system = createMiddlewareSystem();
system.use(async (ctx) => {
    console.log('Middleware 1:', ctx);
    ctx.value++;
});
system.use(async (ctx) => {
    console.log('Middleware 2:', ctx);
    ctx.value *= 2;
});

system.execute({ value: 1 }).then(() => console.log('Done'));