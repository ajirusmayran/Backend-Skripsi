export class PropsUtils {
    shallow<T extends object>(source: T): T {
        return {
            ...source,
        }
    }

}