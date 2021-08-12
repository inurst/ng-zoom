import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';
import { FormBuilder, Validators  } from '@angular/forms'

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  // signatureEndpoint = 'http://localhost:4000/'
  signatureEndpoint = 'https://asia-east2-cnap-e4cef.cloudfunctions.net/startZoom/';
  urlGetZoomActivity = 'https://ubhpw5ne12.execute-api.ap-southeast-1.amazonaws.com/prod/zoom-api';
  apiKey = 'PRvAoUhsRf2Gan87yNz00A'
  meetingNumber = '99124317510'
  role = 0 // 1 for host; 0 for attendee
  leaveUrl = 'https://zoom.cnap.life/'
  userName = 'Test'
  // userEmail = 'inurst@gmail.com'
  passWord = '072'

  activityName = 'วันคุ้มครองโลก';
  title: string;

  constructor(
    public httpClient: HttpClient,
    @Inject(DOCUMENT) document,
    private fb: FormBuilder) { }

    zoomForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      institution: ['', [Validators.required]]
    });

  ngOnInit() {
    this.zoomForm.reset();
    // console.log(this.zoomForm.value);
    this.httpClient.get(this.urlGetZoomActivity).subscribe(res => {
      console.log('res ', res);
      this.meetingNumber = res['body'].meetingID;
      this.activityName = res['body'].activityName;
      // return res;
    });
  }

  getSignature() {

    this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        // console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  getApplicationZoom() {
    console.log('Go !!!');
    window.location.href = 'https://cnap.world/cn6f ';
  }

  getTest() {
    console.log(this.zoomForm);
    const zoomName: string = this.title + '+' + this.zoomForm.value.firstname + '+' + this.zoomForm.value.lastname + '+' + this.zoomForm.value.institution;
    console.log('zoomName : ' + zoomName);
  }

  selectTitle(param: string) {
    this.title = param;
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'
    document.getElementById('zmmtg-root').style.zIndex = '10'

    const zoomName: string = this.title + '+' + this.zoomForm.value.firstname + '+' + this.zoomForm.value.lastname + '+' + this.zoomForm.value.institution;
    this.zoomForm.reset();

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: zoomName,
          apiKey: this.apiKey,
          // userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
