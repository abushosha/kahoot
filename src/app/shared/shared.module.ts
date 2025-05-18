import { NgModule } from "@angular/core";
import { CountriesService } from "./services/countries.service";
import { CoreModule } from "../core/core.module";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    imports: [CoreModule, HttpClientModule],
    declarations: [
  ],
    providers: [CountriesService],
})
export class SharedModule { }