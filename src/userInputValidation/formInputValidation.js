
export const formValidation = (input)=>{

   const err={}
   for(let x in input){
       if(input[x]==="" || input[x].length === 0 ){
         err[x]= ` This ${x} field is required`;
       }
    }
 
 return err;

}