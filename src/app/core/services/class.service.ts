import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Class } from 'src/app/shared/models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private classes: Class[] = [];

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Read the local classes.json file from the assets folder
   */
  async readClasses(): Promise<void> {
    this.classes = await this.http.get<Class[]>('assets/classes.json').toPromise();
  }

  /**
   * Get all classes that were read from the classes.json file
   */
  getClasses(): Class[] {
    return this.classes;
  }

  /**
   * Find a class by year, name and department from the classes.json file
   * 
   * @param completeName which is build by: <year><name><department>. For Example: 5ahitm => 5|a|hitm
   * 
   * @returns the class or null
   */
  getClassByName(completeName: string): Class | null {
    const clazz = this.classes.find(clazz => completeName === clazz.year + clazz.name + clazz.department);
    return clazz || null;
  }
}
