/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateRiddleInput = {
  id?: string | null;
  title: string;
  author: string;
  date: string;
  type: string;
  data: string;
  dataType: string;
};

export type ModelRiddleConditionInput = {
  title?: ModelStringInput | null;
  author?: ModelStringInput | null;
  date?: ModelStringInput | null;
  type?: ModelStringInput | null;
  data?: ModelStringInput | null;
  dataType?: ModelStringInput | null;
  and?: Array<ModelRiddleConditionInput | null> | null;
  or?: Array<ModelRiddleConditionInput | null> | null;
  not?: ModelRiddleConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Riddle = {
  __typename: "Riddle";
  id?: string;
  title?: string;
  author?: string;
  date?: string;
  type?: string;
  data?: string;
  dataType?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateRiddleInput = {
  id: string;
  title?: string | null;
  author?: string | null;
  date?: string | null;
  type?: string | null;
  data?: string | null;
  dataType?: string | null;
};

export type DeleteRiddleInput = {
  id?: string | null;
};

export type ModelRiddleFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  author?: ModelStringInput | null;
  date?: ModelStringInput | null;
  type?: ModelStringInput | null;
  data?: ModelStringInput | null;
  dataType?: ModelStringInput | null;
  and?: Array<ModelRiddleFilterInput | null> | null;
  or?: Array<ModelRiddleFilterInput | null> | null;
  not?: ModelRiddleFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelRiddleConnection = {
  __typename: "ModelRiddleConnection";
  items?: Array<Riddle | null> | null;
  nextToken?: string | null;
};

export type CreateRiddleMutation = {
  __typename: "Riddle";
  id: string;
  title: string;
  author: string;
  date: string;
  type: string;
  data: string;
  dataType: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateRiddleMutation = {
  __typename: "Riddle";
  id: string;
  title: string;
  author: string;
  date: string;
  type: string;
  data: string;
  dataType: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteRiddleMutation = {
  __typename: "Riddle";
  id: string;
  title: string;
  author: string;
  date: string;
  type: string;
  data: string;
  dataType: string;
  createdAt: string;
  updatedAt: string;
};

export type GetRiddleQuery = {
  __typename: "Riddle";
  id: string;
  title: string;
  author: string;
  date: string;
  type: string;
  data: string;
  dataType: string;
  createdAt: string;
  updatedAt: string;
};

export type ListRiddlesQuery = {
  __typename: "ModelRiddleConnection";
  items?: Array<{
    __typename: "Riddle";
    id: string;
    title: string;
    author: string;
    date: string;
    type: string;
    data: string;
    dataType: string;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type OnCreateRiddleSubscription = {
  __typename: "Riddle";
  id: string;
  title: string;
  author: string;
  date: string;
  type: string;
  data: string;
  dataType: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateRiddleSubscription = {
  __typename: "Riddle";
  id: string;
  title: string;
  author: string;
  date: string;
  type: string;
  data: string;
  dataType: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteRiddleSubscription = {
  __typename: "Riddle";
  id: string;
  title: string;
  author: string;
  date: string;
  type: string;
  data: string;
  dataType: string;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateRiddle(
    input: CreateRiddleInput,
    condition?: ModelRiddleConditionInput
  ): Promise<CreateRiddleMutation> {
    const statement = `mutation CreateRiddle($input: CreateRiddleInput!, $condition: ModelRiddleConditionInput) {
        createRiddle(input: $input, condition: $condition) {
          __typename
          id
          title
          author
          date
          type
          data
          dataType
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateRiddleMutation>response.data.createRiddle;
  }
  async UpdateRiddle(
    input: UpdateRiddleInput,
    condition?: ModelRiddleConditionInput
  ): Promise<UpdateRiddleMutation> {
    const statement = `mutation UpdateRiddle($input: UpdateRiddleInput!, $condition: ModelRiddleConditionInput) {
        updateRiddle(input: $input, condition: $condition) {
          __typename
          id
          title
          author
          date
          type
          data
          dataType
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateRiddleMutation>response.data.updateRiddle;
  }
  async DeleteRiddle(
    input: DeleteRiddleInput,
    condition?: ModelRiddleConditionInput
  ): Promise<DeleteRiddleMutation> {
    const statement = `mutation DeleteRiddle($input: DeleteRiddleInput!, $condition: ModelRiddleConditionInput) {
        deleteRiddle(input: $input, condition: $condition) {
          __typename
          id
          title
          author
          date
          type
          data
          dataType
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteRiddleMutation>response.data.deleteRiddle;
  }
  async GetRiddle(id: string): Promise<GetRiddleQuery> {
    const statement = `query GetRiddle($id: ID!) {
        getRiddle(id: $id) {
          __typename
          id
          title
          author
          date
          type
          data
          dataType
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetRiddleQuery>response.data.getRiddle;
  }
  async ListRiddles(
    filter?: ModelRiddleFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListRiddlesQuery> {
    const statement = `query ListRiddles($filter: ModelRiddleFilterInput, $limit: Int, $nextToken: String) {
        listRiddles(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            title
            author
            date
            type
            data
            dataType
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListRiddlesQuery>response.data.listRiddles;
  }
  OnCreateRiddleListener: Observable<
    SubscriptionResponse<OnCreateRiddleSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateRiddle {
        onCreateRiddle {
          __typename
          id
          title
          author
          date
          type
          data
          dataType
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateRiddleSubscription>>;

  OnUpdateRiddleListener: Observable<
    SubscriptionResponse<OnUpdateRiddleSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateRiddle {
        onUpdateRiddle {
          __typename
          id
          title
          author
          date
          type
          data
          dataType
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateRiddleSubscription>>;

  OnDeleteRiddleListener: Observable<
    SubscriptionResponse<OnDeleteRiddleSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteRiddle {
        onDeleteRiddle {
          __typename
          id
          title
          author
          date
          type
          data
          dataType
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteRiddleSubscription>>;
}
