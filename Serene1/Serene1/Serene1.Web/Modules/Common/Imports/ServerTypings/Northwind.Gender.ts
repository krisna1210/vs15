namespace Serene1.Northwind {
    export enum Gender {
        Male = 1,
        Female = 2
    }
    Serenity.Decorators.addAttribute(Gender, new Serenity.EnumKeyAttribute('Serene1.Northwind.Entities.Gender'));
}

