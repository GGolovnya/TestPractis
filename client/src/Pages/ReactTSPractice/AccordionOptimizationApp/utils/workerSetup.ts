// src/utils/workerSetup.ts

// Интерфейс для результата вычислений
interface CalculationResult {
sum: number;
average: number;
categories: Record<string, number>;
}

export const initializeWorker = (
workerId: string,
onError: (error: string) => void
): Worker | null => {
try {
    const worker = new Worker(new URL('../workers/calculator.js', import.meta.url));
    
    worker.onerror = (error) => {
    console.error(`Ошибка инициализации воркера ${workerId}:`, error);
    onError(`Не удалось инициализировать воркер: ${error.message}`);
    worker.terminate();
    };

    // Типизируем обработчик сообщений от воркера
    worker.onmessage = (event: MessageEvent<CalculationResult>) => {
    const result = event.data;
    // Здесь можно добавить дополнительную обработку результата
    console.log(`Воркер ${workerId} вернул результат:`, result);
    };

    return worker;
} catch (error) {
    console.error(`Не удалось создать воркер ${workerId}:`, error);
    onError(`Не удалось создать воркер: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    return null;
}
};