import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemLinkageService {

  constructor() { }

  public systemSupplierSystems = [
    {num: 0, name: 'Not entered'},
    {num: 1, name: 'EMIS Web'},
    {num: 2, name: 'SystmOne'},
    {num: 3, name: 'Vision'},
    {num: 4, name: 'Adastra'},
    {num: 5, name: 'Cerner Millennium'},
    {num: 6, name: 'Rio'}
  ];

  public systemSupplierSharingActivated = [
    {num: 0, name: 'No'},
    {num: 1, name: 'Yes'},
  ];

  // DB method already exists for this
  public organisationType = [
    {num: 0, name: 'GP Practice'},
    {num: 1, name: 'NHS Trust'},
    {num: 2, name: 'NHS Trust Site'},
    {num: 3, name: 'Pathology Laboratory'},
    {num: 4, name: 'Branch'},
    {num: 5, name: 'Commissioning Region'},
    {num: 6, name: 'Care Trust'},
    {num: 7, name: 'Care Trust Site'},
    {num: 8, name: 'CCG'},
    {num: 9, name: 'CCG Site'},
    {num: 10, name: 'CSU'},
    {num: 11, name: 'CSU Site'},
    {num: 12, name: 'Education Establishment'},
    {num: 13, name: 'NHS Hospice'},
    {num: 14, name: 'Non NHS Hospice'},
    {num: 15, name: 'IoM Government Directorate'},
    {num: 16, name: 'IoM Government Department'},
    {num: 17, name: 'Justice Entity'},
    {num: 18, name: 'Non NHS Organisation'},
    {num: 19, name: 'NHS Support Agency'},
    {num: 20, name: 'Optical HQ'},
    {num: 21, name: 'Optical Site'},
    {num: 22, name: 'Other'},
    {num: 23, name: 'Pharmacy HQ'},
    {num: 24, name: 'ISHP'},
    {num: 25, name: 'ISHP Site'},
    {num: 26, name: 'Prison'},
    {num: 27, name: 'School'},
    {num: 28, name: 'Special Health Authority'},
    {num: 29, name: 'Local Authority'},
    {num: 30, name: 'Local Authority Site'},
    {num: 31, name: 'NI organisation'},
    {num: 32, name: 'Scottish GP Practice'},
    {num: 33, name: 'Scottish Provider Organisation'},
    {num: 34, name: 'Wales Health Board'},
    {num: 35, name: 'Wales Health Board Site'},
    {num: 36, name: 'Dispensary'},
    {num: 37, name: 'IoM Government Directorate Site'}
  ];

  public status = [
    {num: 0, name: 'Active'},
    {num: 1, name: 'Inactive'}
  ];

  public consents = [
    {num: 0, name : 'Explicit Consent'},
    {num: 1, name : 'Implied Consent'}
  ];

  public businessCaseStatuses = [
    {num: 0, name: 'Submitted'},
    {num: 1, name: 'Approved'}
  ];

  public storageProtocols = [
    {num: 0, name: 'Audit only'},
    {num: 1, name: 'Temporary Store And Forward'},
    {num: 2, name: 'Permanent Record Store'}
  ];

  public deidentificationLevel = [
    {num: 0, name: 'Patient identifiable data'},
    {num: 1, name: 'Pseudonymised data'}
  ];

  public projectTypes = [
    {num: 0, name: 'Extract'},
    {num: 1, name: 'Query'},
    {num: 2, name: 'API'},
    {num: 3, name: 'Data Assurance'},
    {num: 4, name: 'Distribution'},
    {num: 5, name: 'Query – view down to practice level'},
    {num: 6, name: 'Query – view down to CCG/Borough level'},
    {num: 7, name: 'Query – view down to STP level'}
  ];

  public flowScheduleIds = [
    {num: 0, name: 'Daily'},
    {num: 1, name: 'On Demand'},
    {num: 2, name: 'Weekly'},
    {num: 3, name: 'Monthly'},
    {num: 4, name: 'Annually'},
    {num: 5, name: 'One off'},
    {num: 6, name: 'Quarterly'}
  ];

  public outputFormat = [
    {num: 0, name: 'FHIR'},
    {num: 1, name: 'CSV'}
  ];

  public securityInfrastructures = [
    {num: 0, name: 'N3'},
    {num: 1, name: 'PSN'},
    {num: 2, name: 'Internet'}
  ];

  public securityArchitectures = [
    {num: 0, name: 'TLS/MA'},
    {num: 1, name: 'Secure FTP'}
  ];

  public mapTypes = [
    {num: 0, name: 'Service'},
    {num: 1, name: 'Organisation'},
    {num: 2, name: 'Region'},
    {num: 3, name: 'Data Sharing Agreement'},
    // {num: 4, name: 'Data Flow'},
    {num: 5, name: 'Data Processing Agreement'},
    {num: 6, name: 'Cohort'},
    {num: 7, name: 'Data Set'},
    {num: 8, name: 'Publisher'},
    {num: 9, name: 'Subscriber'},
    {num: 10, name: 'Purpose'},
    {num: 11, name: 'Benefit'},
    {num: 12, name: 'Document'},
    // {num: 13, name: 'Data Exchange'},
    {num: 14, name: 'Project'},
    {num: 15, name: 'Extract Technical Details'},
    {num: 16, name: 'Schedule'}
  ];

  public getLinkedItem(id: number, lookupArray: string): string {
    const foundLink = this[lookupArray].find(i => i.num === id);
    if (foundLink != null) {
      return foundLink.name;
    } else {
      return 'Unknown value';
    }
  }
}
