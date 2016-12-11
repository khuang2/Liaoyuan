function Employee(name, wage, bonus, houseRate,level){
    this.name=name;
    this.wage = wage;
    this.bonus = bonus;
    this.houseRate = houseRate;
    this.level = level;
}


Employee.prototype.setInsurance=function(insuranceRate,averageWage){
    var wage_ceiling = averageWage*3;
    var wage_floor = averageWage*0.6;
    var rate1 = (+insuranceRate[1][1])+(+insuranceRate[1][2])+(+insuranceRate[1][3])+(+insuranceRate[1][4])+(+insuranceRate[1][5]);//company insurance rate 
    var rate2 = (+insuranceRate[2][1])+(+insuranceRate[2][2])+(+insuranceRate[2][3])+(+insuranceRate[2][4])+(+insuranceRate[2][5]);// personal insurance
    var base = this.wage;
    if(this.wage>wage_ceiling){
        base = wage_ceiling;
    }else if(this.wage<wage_floor){
        base = wage_floor;
    }
    this.companyInsurance = base*(rate1+this.houseRate);
    this.personalInsurance = base*(rate2+this.houseRate);
}


Employee.prototype.setIncomeBeforeTax=function(){

    this.incomeBeforeTax=this.wage+this.bonus-this.personalInsurance;
}

Employee.prototype.setTax=function(IndividualTaxRate){
    var taxAmount = 0;
    var salaryBar = IndividualTaxRate[0];
    var taxRate = IndividualTaxRate[1];
    var len = taxRate.length;
    var diff = this.incomeBeforeTax-3500;
    for(i=0;i<len;i++){
        if(diff<salaryBar[i]) break;
        if(i==len-1){
            taxAmount+=(diff-salaryBar[i])*taxRate[i];
        }else{
            if(diff<salaryBar[i+1]){
                taxAmount+=(diff-salaryBar[i])*taxRate[i];
                break;
            }else{
                taxAmount+=(salaryBar[i+1]-salaryBar[i])*taxRate[i];
            }
        }
    }
    this.tax=taxAmount;
}

Employee.prototype.setIncomeAfterTax=function(){
    this.incomeAfterTax=this.incomeBeforeTax-this.tax;
}