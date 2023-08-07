
const AGI_DATE = new Date("31.12.2032");
export function timToAgi():number{
  const now = new Date();
  return now - AGI_DATE;

}
