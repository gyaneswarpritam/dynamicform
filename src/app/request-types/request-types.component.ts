import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import Stepper from "bs-stepper";

@Component({
  selector: "app-request-types",
  templateUrl: "./request-types.component.html",
  styleUrls: ["./request-types.component.css"],
})
// export class NgbdDatepickerPopup {
//   model: NgbDateStruct;
// }
export class RequestTypesComponent implements OnInit {
  eventsSubject: Subject<void> = new Subject<void>();
  private stepper: Stepper;
  myForm: FormGroup;
  platformValue: any;
  allianceName: any;
  incoming: boolean = false;
  outgoing: boolean = false;
  incomingJobTotal: any;
  outgoingJobTotal: any;
  userProtocol: string;
  prodDateMin: Date;
  prodDateMax: Date;
  testDateMin: Date;
  testDateMax: Date;
  CARDOmaha: boolean = false;
  MerchantNorth: boolean = false;
  MerchantSouth: boolean = false;
  Star_SE_SW: boolean = false;
  Srat_NE: boolean = false;
  TransArmor: boolean = false;
  Other_NA: boolean = false;
  Other_EMEA: boolean = false;
  fundingIn_yes: any;
  SLAIn_yes: any;
  fundingOut_yes: any;
  SLAOut_yes: any;

  model: any;
  //  client_name: any = ["Karias SA [0915747]", "(CUCC) PSCU"];
  client_name: any;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      Requestor: ["", Validators.required],
      RequestorPhone: ["", Validators.required],
      RequestorEmail: ["", Validators.required],
      RequestTitle: ["", Validators.required],
      BusUnit: ["", Validators.required],
      SubPlatform: [""],
      ClientNumber: [""],
      Sys: [""],
      Prin: [""],
      PlatformIn: [""],
      PlatformIn1: [""],
      PlatformIn2: [""],
      SecurityCodeIn: [""],
      MerchantID: [""],
      MerchantID1: [""],
      PrcIntID: [""],
      PrcIntLocation: [""],
      EndpointID: [""],
      MerchantID2: [""],
      AllianceName: ["", Validators.required],
      TestDate: ["", Validators.required],
      ProdDate: ["", Validators.required],
      CRNum: [""],
      ClientName: ["", Validators.required],
      ClientContact: ["", Validators.required],
      ClientPhone: ["", Validators.required],
      PRJ_number: [""],
      SC_number: [""],
      ClientEmail: ["", Validators.required],
      Client_Services_Rep: ["", Validators.required],
      HelpDeskPhone: ["", Validators.required],
      Client_Help_Desk_and_or_24_7_email_address: ["", Validators.required],
      Comments: [""],
      Xmit_Direction: ["", Validators.required],
      IncomingCount: ["", Validators.required],
      XmitMethod: ["", Validators.required],
      Platform_XmitMethod: ["", Validators.required],
      OutgoingCount: [""],
      Platform_XmitMethodOut: [""],
      XmitMethodOut: [""],
      MWUser: [""],
      ExistingCommunity: [""],
      CommunityName: [""],
      CommunityProtocol: [""],
      Connect_In_Local_Node_Name: [""],
      Connect_In_Remote_Node_Name: [""],
      Connect_In_certificate: [""],
      Connect_In_User_ID: [""],
      Connect_In_Remote_Password: [""],
      SFTP_IN_Remote_User: [""],
      SFTP_IN_Remote_Host: [""],
      SFTP_IN_Remote_Port: [""],
      SFTP_IN_Remote_Directory: [""],
      FTPS_In_FTP: [""],
      FTPS_In_FTP_Server: [""],
      FTPS_Connection_Type: [""],
      FTPS_In_User: [""],
      FTPS_In_Password: [""],
      PickupMailboxName: [""],
      Quest_Form: [""],
      SSHKey: [""],
      PGPkey: [""],
      JobnameIn: ["", Validators.required],
      ProductIn: ["", Validators.required],
      FundingIn: [""],
      FundingAvgIn: [""],
      SLAIn: [""],
      SLADetailsIn: [""],
      CopyJobIn: [""],
      DestinationFileIn: ["", Validators.required],
      ReceiptNotifyToIn: [""],
      JobnameOut: [""],
      ProductOut: [""],
      FundingOut: [""],
      FundingAvgOut: [""],
      SLAOut: [""],
      SLADetailsOut: [""],
      CopyJobOut: [""],
      SourceFile: [""],
      ReceiptNotifyToOut: [""],
    });
  }

  get registerFormControl() {
    return this.myForm.controls;
  }
  keyword = "CLIENT_NAME";

  ngOnInit() {
    console.log("hi");
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
    this.testDateMin = new Date();
    this.testDateMax = new Date();
    this.testDateMin.setDate(this.testDateMin.getDate());
    this.testDateMax.setDate(this.testDateMax.getDate() + 14);
    this.myForm.controls["TestDate"].setValue(this.testDateMax);

    this.prodDateMin = new Date();
    this.prodDateMax = new Date();
    this.prodDateMin.setDate(this.prodDateMin.getDate());
    this.prodDateMax.setDate(this.prodDateMax.getDate() + 28);
    this.myForm.controls["ProdDate"].setValue(this.prodDateMax);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.client_name
              .filter(
                (v) =>
                  v.CLIENT_NAME.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  changeTransmissionDirection(e) {
    const Xmit_Direction = e.target.value;
    if (Xmit_Direction == "Incoming") {
      this.incoming = true;
      this.outgoing = false;
    } else if (Xmit_Direction == "Outgoing") {
      this.incoming = false;
      this.outgoing = true;
    } else if (Xmit_Direction == "Both") {
      this.incoming = true;
      this.outgoing = true;
    } else {
      this.incoming = false;
      this.outgoing = false;
    }
  }

  platformDropdownDisplay(e) {
    const BusUnit = e.target.value;
    if (BusUnit == "1") {
      this.CARDOmaha = true;
      this.MerchantNorth = false;
      this.MerchantSouth = false;
      this.Star_SE_SW = false;
      this.Srat_NE = false;
      this.TransArmor = false;
      this.Other_NA = false;
      this.Other_EMEA = false;
    } else if (BusUnit == "4") {
      this.CARDOmaha = false;
      this.MerchantNorth = true;
      this.MerchantSouth = false;
      this.Star_SE_SW = false;
      this.Srat_NE = false;
      this.TransArmor = false;
      this.Other_NA = false;
      this.Other_EMEA = false;
    } else if (BusUnit == "5") {
      this.CARDOmaha = false;
      this.MerchantNorth = false;
      this.MerchantSouth = true;
      this.Star_SE_SW = false;
      this.Srat_NE = false;
      this.TransArmor = false;
      this.Other_NA = false;
      this.Other_EMEA = false;
    } else if (BusUnit == "10") {
      this.CARDOmaha = false;
      this.MerchantNorth = false;
      this.MerchantSouth = false;
      this.Star_SE_SW = true;
      this.Srat_NE = false;
      this.TransArmor = false;
      this.Other_NA = false;
      this.Other_EMEA = false;
    } else if (BusUnit == "14") {
      this.CARDOmaha = false;
      this.MerchantNorth = false;
      this.MerchantSouth = false;
      this.Star_SE_SW = false;
      this.Srat_NE = true;
      this.TransArmor = false;
      this.Other_NA = false;
      this.Other_EMEA = false;
    } else if (BusUnit == "48") {
      this.CARDOmaha = false;
      this.MerchantNorth = false;
      this.MerchantSouth = false;
      this.Star_SE_SW = false;
      this.Srat_NE = false;
      this.TransArmor = true;
      this.Other_NA = false;
      this.Other_EMEA = false;
    } else if (BusUnit == "51") {
      this.CARDOmaha = false;
      this.MerchantNorth = false;
      this.MerchantSouth = false;
      this.Star_SE_SW = false;
      this.Srat_NE = false;
      this.TransArmor = false;
      this.Other_NA = true;
      this.Other_EMEA = false;
    } else if (BusUnit == "56") {
      this.CARDOmaha = false;
      this.MerchantNorth = false;
      this.MerchantSouth = false;
      this.Star_SE_SW = false;
      this.Srat_NE = false;
      this.TransArmor = false;
      this.Other_NA = false;
      this.Other_EMEA = true;
    } else {
      this.CARDOmaha = false;
      this.MerchantNorth = false;
      this.MerchantSouth = false;
      this.Star_SE_SW = false;
      this.Srat_NE = false;
      this.TransArmor = false;
      this.Other_NA = false;
      this.Other_EMEA = false;
    }
  }

  fundingInDropdownDisplay(e, index) {
    console.log(index, "index");
    const FundingIn = e.target.value;
    if (FundingIn == "Yes") {
      this.fundingIn_yes = true;
    } else {
      this.fundingIn_yes = false;
    }
  }
  SLAInDropdownDisplay(e) {
    const SLAIn = e.target.value;
    if (SLAIn == "Yes") {
      this.SLAIn_yes = true;
    } else {
      this.SLAIn_yes = false;
    }
  }

  fundingOutDropdownDisplay(e) {
    const FundingOut = e.target.value;
    if (FundingOut == "Yes") {
      this.fundingOut_yes = true;
    } else {
      this.fundingOut_yes = false;
    }
  }

  SLAOutDropdownDisplay(e) {
    const SLAOut = e.target.value;
    if (SLAOut == "Yes") {
      this.SLAOut_yes = true;
    } else {
      this.SLAOut_yes = false;
    }
  }

  incomingJobCount(e) {
    this.incomingJobTotal = Array.from(
      { length: e.target.value },
      (v, k) => k + 1
    );
  }

  outgingJobCount(e) {
    this.outgoingJobTotal = Array.from(
      { length: e.target.value },
      (v, k) => k + 1
    );
  }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    // console.log(this.myForm.value, "form");
    if (this.myForm.valid) {
    }
  }

  getInfo(data) {
    console.log("event data", data);
  }

  emitEventToChild() {
    this.eventsSubject.next();
  }

  userProtocolChange(e) {
    this.userProtocol = e.target.value;
  }

  selectEvent(item) {
    // do something with selected item
    console.log(item, "item..");
    this.myForm.controls["ClientContact"].setValue(item.ClientContact);
    this.myForm.controls["ClientEmail"].setValue(item.ClientEmail);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }
}

// export class DemoDatepickerMinMaxComponent {
//   minDate: Date;
//   maxDate: Date;

//   constructor() {
//     this.minDate = new Date();
//     this.maxDate = new Date();
//     this.minDate.setDate(this.minDate.getDate() - 1);
//     this.maxDate.setDate(this.maxDate.getDate() + 7);
//   }
// }
