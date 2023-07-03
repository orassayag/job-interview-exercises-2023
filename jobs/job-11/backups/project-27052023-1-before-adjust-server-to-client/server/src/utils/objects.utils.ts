import CustomError from '../custom/error.custom';

// ToDo: Write comment for each function.

export default class ObjectsUtils {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  public static getObjProperties(obj: object, properties: string[]): object {
    const checkObj = obj as any;
    const newObject: any = {};
    for (const property of properties) {
      if (checkObj[property]) {
        newObject[property] = checkObj[property];
      }
    }
    return newObject;
  }
}
