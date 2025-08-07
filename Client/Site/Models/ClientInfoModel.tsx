export class ClientInfoModel 
{
  clientId: number
  firstName: string
  lastName: string
  email: string
  age: number
  locality: string
  country: string


  constructor (cl: number, fN: string, lN: string, el: string, ag: number, loc: string, cntry: string)
  {
    this.clientId = cl;
    this.firstName = fN;
    this.lastName = lN;
    this.email = el;
    this.age = ag;
    this.locality = loc;
    this.country = cntry;
  }
}