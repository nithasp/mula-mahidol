export interface IFilterVesselImportList {
   limit: number;
   page: number;
   search: string;
   created: string;
   mooringDate: string;
   unmooringDate: string;
   vesselFlagId: number;
   vesselTypeId: number;
   berthId: number;
   jettyId: number;
}

export interface IVesselImportList {
   id: number;
   email: string;
   rightsType: string;
   type: string;
   versionApp: string;
   personType: string;
   tax: string;
   company: string;
   fullName: string;
   phone: string;
   mobilePhone: string;
   address: string;
   countryId: number;
   subDistrictId: number;
   districtId: number;
   provinceId: number;
   stageProvince: string;
   zipCode: string;
   uploadFiles: any | null;
   status: string;
   createdAt: string;
   updatedAt: string;
   roleId: number | null;
   roleName: string;
   roleType: string;
   enabled: boolean;
   isAcceptedTerm: boolean;
   isFirstLogin: boolean;
   subject: string;
}

export interface IVesselImportError {
    rowNo: number;
    vesselName: string;
    note: string;
}

export interface IClassScheduleMockup {
   id: number;
   subject: string;
   credits: number;
   classGroup: string;
   gradeLevel: string;
   day: string;
   time: string;
   studentsCount: number;
   classroom: string;
   teacher: string;
   subjectGroup: string;
   schedule: string;
   actions: string;
}
