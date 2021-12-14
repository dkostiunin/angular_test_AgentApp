import { Component } from '@angular/core';

export class Dataset{
  constructor(public distance: number, 
              public age: number, 
              public weight: number)
  { }
}

export class Carrier{ 
  discount: number = 1
  results: { type: string, result: number }[] = []
  constructor(public userDist: number, 
              public userAge: number, 
              public userweight: number, 
             )
  {} 
}

export class Aeroflot extends Carrier{ 
  calc(){
    if (this.userAge >= 0 && this.userweight >= 0 && this.userDist > 0) {
      this.results=[]
      if (this.userweight <= 5) {
        this.results.push({ type:'Эконом: ', 
                            result:this.userDist * 4
                          })
      } else if (this.userweight > 5 && this.userweight <= 20) {
          this.results.push({ type:'Эконом: ', 
                            result:this.userDist * 4 + 4000
                          })
        }

      this.userAge < 7 ? this.discount = 0.7 : this.discount = 1
      if (this.userweight <= 20) {
        this.results.push({ type:'Продвинутый: ', 
                            result:this.userDist * 8 * this.discount
                          })
      } else if (this.userweight > 20 && this.userweight <= 50) {
          this.results.push({ type:'Продвинутый: ', 
                            result:this.userDist * 8 * this.discount + 5000
                          })
        }

        this.userAge < 16 ? this.discount = 0.7 : this.discount = 1
        if (this.userweight <= 50) {
            this.results.push({ type:'Люкс: ', 
                                result:this.userDist * 15 * this.discount
                              })
        }
    }
    return this.results
  }
}

export class RZD extends Carrier{ 

  calc(){
    if (this.userAge >= 0 && this.userweight >= 0 && this.userDist > 0) {
      this.results=[]
      this.userAge < 5 ? this.discount = 0.5 : this.discount = 1
      if (this.userweight <= 15) {
        this.results.push({ type:'Эконом: ', 
                            result:this.userDist * 0.5 * this.discount
                          })
      } else if (this.userweight > 15 && this.userweight <= 50) {
          this.results.push({ type:'Эконом: ', 
                            result:this.userDist * 0.5 * this.discount + (this.userweight - 15) * 50
                          })
        }

      this.userAge < 8 ? this.discount = 0.7 : this.discount = 1
      if (this.userweight <= 20) {
        this.results.push({ type:'Продвинутый: ', 
                            result:this.userDist * 2 * this.discount
                          })
      } else if (this.userweight > 20 && this.userweight <= 60) {
          this.results.push({ type:'Продвинутый: ', 
                            result:this.userDist * 2 * this.discount + (this.userweight - 20) * 50
                          })
        }

      this.userAge < 16 ? this.discount = 0.8 : this.discount = 1
        if (this.userweight <= 60) {
            this.results.push({ type:'Люкс: ', 
                                result:this.userDist * 4 * this.discount
                              })
        }
    }
    return this.results
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  data: Dataset = new Dataset(0,0,0) 
  aeroflot: Aeroflot | undefined
  rzd: RZD | undefined
  listRZD: any[] = []
  listAeroflot: any[] = []

  addData(){
    this.aeroflot = new Aeroflot(this.data.distance,this.data.age,this.data.weight);
    this.rzd = new RZD(this.data.distance,this.data.age,this.data.weight);

    
    console.log(this.aeroflot.calc(),this.rzd.calc())
    this.listRZD = this.rzd.calc()
    this.listAeroflot = this.aeroflot.calc()
  
  }
}
