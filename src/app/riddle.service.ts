import { Injectable } from '@angular/core';
import { APIService } from './API.service';
import { Riddle, RiddleDataType } from '../types/riddle';
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

@Injectable({
  providedIn: 'root'
})
export class RiddleService {
  constructor(private api: APIService) { }

  // Get riddles from api
  getRiddles(): Promise<any> {
    return this.api.ListRiddles().then(event => {
      return event.items;
    });
  }

  // If the riddle is an image or video, upload the file and then save the metadata with the api
  async addRiddle(riddle: Riddle, newFile: File): Promise<any> {
    if (riddle.dataType !== RiddleDataType.Text && newFile) {
      await Storage.put(riddle.data, newFile).then(storageResult => {
        riddle.data = awsconfig.public_url_prefix + storageResult['key'];
      });
    }

    return this.api.CreateRiddle(riddle).then(event => {
      return event;
    });
  }

  // Delete the riddle with the api
  deleteRiddle(id: string): Promise<any> {
    return this.api.DeleteRiddle({ id }).then(event => {
      return event;
    });
  }
}
