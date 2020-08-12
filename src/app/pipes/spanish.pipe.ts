import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'spanish'
})
export class SpanishPipe implements PipeTransform{


    transform(value: any, field:string) {
        if(field == 'status'){
            if(value == 'Alive')return 'Viv@';
            if(value == 'Dead') return 'Muert@';
            if(value == 'Unknown') return 'Desconocido';
        }
        if(field== 'gender'){
            if(value == 'Female')return 'Femenino';
            if(value == 'Male') return 'Masculino';
            if(value == 'Genderless') return 'Sin genero';
            if(value == 'Unknown') return 'Desconocido';
        }
    }

}