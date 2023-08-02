import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
//import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TokenService } from '../login/token.service';

@Injectable({ providedIn: 'root' })
export class AdministrationService {
    private subscription: Subscription;

    private accessToken = ''; // temp empty string

    private baseApiUrl = 'localhost:5002/';

    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
    });

    private headersFile = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.accessToken}`,
    });

    constructor(
            private http: HttpClient,
            private notification: NzNotificationService,
            private router: Router,
            //private msg: NzMessageService,
            public tokenService: TokenService
        ) 
    {
        this.subscription = this.tokenService.getToken().subscribe((token) => {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.accessToken}`,
            });
        });
    }

    getRoles(): Observable<HttpResponse<any>> {
        return this.http.get(`${this.baseApiUrl}api/admin/api/User/GetRoles`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getPermissions(): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/User/getPermissions`,
            { observe: 'response', headers: this.headers }
        );
    }

    getRolePermissions(value: string): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/User/GetRolePermissions?role=${value}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getKatoPermissions(value: string): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/User/GetKatoPermissions?kato=${value}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getUserPermissions(): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/User/GetUserPermissions`,
            { observe: 'response', headers: this.headers }
        );
    }

    addOrUpdateRolePermissions(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/User/AddOrUpdateRolePermissions`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    addOrUpdateKatoPermissions(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/User/AddOrUpdateKatoPermissions`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getStructureById(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/OrgStructure/GetOrgStructure?parentId=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getOrgStructureById(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/OrgStructure/GetOrgStructureById?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getOrgStructureWithUsers(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/OrgStructure/GetOrgStructureWithUsers?parentId=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    updateOrgStructureName(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/OrgStructure/UpdateOrgStructureName`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getFeedingCauses(): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicArea/FeedingCauses`,
            { observe: 'response', headers: this.headers }
        );
    }

    addNewUser(data: any): Observable<HttpResponse<any>> {
        return this.http.post(`${this.baseApiUrl}api/identity/register`, data, {
            observe: 'response',
            headers: this.headers,
        });
    }

    addNewAgroDoctorUser(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/registerAgroDoctor`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getAgroDoctorEconomies(userId: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/Doctor/GetAgroDoctorEconomies?userId=${userId}`,
            { observe: 'response', headers: this.headers }
        );
    }

    updateUser(data: any): Observable<HttpResponse<any>> {
        return this.http.post(`${this.baseApiUrl}api/identity/update`, data, {
            observe: 'response',
            headers: this.headers,
        });
    }

    updateAgroDoctorUser(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/updateAgroDoctor`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    updateUserPermission(id: any, val: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/UpdateUserPermission?userId=${id}&isGreenCorridor=${val}`,
            {},
            { observe: 'response', headers: this.headers }
        );
    }

    updateUserPermissionIsRvl(id: any, val: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/UpdateUserPermission?userId=${id}&isRvl=${val}`,
            {},
            { observe: 'response', headers: this.headers }
        );
    }

    updateUserCityUser(id: any, val: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/UpdateUserPermission?userId=${id}&isCityUser=${val}`,
            {},
            { observe: 'response', headers: this.headers }
        );
    }

    getUserList(data: any): Observable<HttpResponse<any>> {
        return this.http.post(`${this.baseApiUrl}api/identity/get`, data, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getDoctorList(data: any): Observable<HttpResponse<any>> {
        return this.http.post(`${this.baseApiUrl}api/identity/get`, data, {
            observe: 'response',
            headers: this.headers,
        });
    }

    blockUser(id: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/block?id=${id}`,
            {},
            { observe: 'response', headers: this.headers }
        );
    }

    unBlockUser(id: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/unblock?id=${id}`,
            {},
            { observe: 'response', headers: this.headers }
        );
    }

    passwordReset(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/passwordReset`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    ForgotPassword(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/ForgotPassword`,
            data,
            { observe: 'response' }
        );
    }

    deleteUser(id: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/delete?id=${id}`,
            {},
            { observe: 'response', headers: this.headers }
        );
    }

    recoveryUser(id: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/identity/recovery?id=${id}`,
            {},
            { observe: 'response', headers: this.headers }
        );
    }

    getUserById(id: any): Observable<HttpResponse<any>> {
        return this.http.get(`${this.baseApiUrl}api/identity/getById?id=${id}`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getContractByOrgId(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/Contract/GetContractByOrgId?orgId=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getAgroContractByOrgId(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/Contract/GetAgroContractByOrgId?orgId=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    addContract(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/Contract/AddContract`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    addAgroContract(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/Contract/AddAgroContract`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    assignContract(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/Contract/AddUserByContract`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    deleteContractFromUser(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(
            `${this.baseApiUrl}api/admin/api/Contract/DeleteUserByContract?orgContractId=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    deleteContract(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(
            `${this.baseApiUrl}api/admin/api/Contract/DeleteContract?contractId=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    deleteAgroContract(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(
            `${this.baseApiUrl}api/admin/api/Contract/DeleteAgroContract?contractId=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    addFile(file: any) {
        return this.http.post(
            `${this.baseApiUrl}api/file/api/File/UploadFile`,
            file,
            { observe: 'response', headers: this.headersFile }
        );
    }

    getFile(id: any) {
        return this.http.get<any>(`${this.baseApiUrl}api/file/api/File/${id}`, {
            observe: 'response',
            headers: this.headers,
            responseType: 'blob' as 'json',
        });
    }

    getFileGreenCorridorThird(id: any, type: number) {
        return this.http.get<any>(
            `${this.baseApiUrl}api/file/api/File/${id}/${type}`,
            {
                observe: 'response',
                headers: this.headers,
                responseType: 'blob' as 'json',
            }
        );
    }

    addPhysic(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/Individual/AddIndividualPhysical`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getPhysicOwners(
        pagination: any,
        fullName: any,
        Iin: any
    ): Observable<HttpResponse<any>> {
        let search = '';
        search = `searchName=${fullName || ''}&searchIin=${Iin || ''}`;
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/Individual/GetPhysicalIndividuals?${search}`,
            pagination,
            { observe: 'response', headers: this.headers }
        );
    }

    getKato(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicKato/GetKato?kato=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getKatoRegion(): Observable<HttpResponse<any>> {
        return this.http.get(`${this.baseApiUrl}api/admin/api/DicKato/GetKato`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getKatoById(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicKato/GetKatoById?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getCountry() {
        return this.http.get(`${this.baseApiUrl}api/admin/api/DicCounty/Get`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getDicRvlBranch() {
        return this.http.get(`${this.baseApiUrl}api/admin/api/DicRvlBranch/Get`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getDicSickness() {
        return this.http.get(`${this.baseApiUrl}api/admin/api/DicSickness/Get`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getListDicSickness() {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicSickness/GetList`,
            { observe: 'response', headers: this.headers }
        );
    }

    getDicSicknessType() {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicSicknessType/Get`,
            {
                observe: 'response',
                headers: this.headers,
            }
        );
    }

    getListDicSicknessType() {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicSicknessType/GetList`,
            { observe: 'response', headers: this.headers }
        );
    }

    deleteIndividualUser(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(
            `${this.baseApiUrl}api/admin/api/Individual/DeleteIndividual?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getIndividualUserById(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/Individual/GetPhysicalIndividualById?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getIndividualJurUserById(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/Individual/GetJuridicalIndividualById?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getIndividualJurUserByBin(bin: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/integration/api/Service/GetUL?identifier=${bin}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getIndividualPhysUserByIin(iin: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/integration/api/Service/GetFL?identifier=${iin}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getExistedUser(iin: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/Individual/GetExistedUserKGDIP?iin=${iin}`,
            { observe: 'response', headers: this.headers }
        );
    }

    updatePhysicUser(data: any): Observable<HttpResponse<any>> {
        return this.http.put(
            `${this.baseApiUrl}api/admin/api/Individual/UpdateIndividualPhysical`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    // getJurOwners(pagination, fullName, Bin): Observable<HttpResponse<any>> {
    //     let search = '';
    //     search = `searchName=${fullName || ''}&searchBin=${Bin || ''}`;
    //     return this.http.post(
    //         `${this.baseApiUrl}api/admin/api/Individual/GetJuridicalIndividuals?${search}`,
    //         pagination,
    //         { observe: 'response', headers: this.headers }
    //     );
    //}

    addJur(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/Individual/AddIndividualJuridical`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    updateJurUser(data: any): Observable<HttpResponse<any>> {
        return this.http.put(
            `${this.baseApiUrl}api/admin/api/Individual/UpdateIndividualJuridical`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getEnterpriseType() {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicEnterpriseType/Get`,
            { observe: 'response', headers: this.headers }
        );
    }

    getOkedType() {
        return this.http.get(`${this.baseApiUrl}api/admin/api/DicOked/Get`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getOpfType() {
        return this.http.get(`${this.baseApiUrl}api/admin/api/DicOpf/Get`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getPhysicOpfType() {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicOpf/GetPhysicOpf`,
            {
                observe: 'response',
                headers: this.headers,
            }
        );
    }

    getNorezidentOwners(pagination: any, fullName: any) {
        let search = '';
        search = `searchName=${fullName || ''}`;
        return this.http.post<any>(
            `${this.baseApiUrl}api/admin/api/Individual/GetNoresidentIndividuals?${search}`,
            pagination,
            { observe: 'response', headers: this.headers }
        );
    }

    addNoRezident(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/Individual/AddIndividualNoresident`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    updateNoRezident(data: any): Observable<HttpResponse<any>> {
        return this.http.put(
            `${this.baseApiUrl}api/admin/api/Individual/UpdateIndividualNoresident`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getNorezidentById(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/Individual/GetNoresidentIndividualById?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getDictionaryByKey(key: any): Observable<HttpResponse<any>> {
        return this.http.get(`${this.baseApiUrl}api/admin/api/${key}/Get`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getAllDirections(): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicDirection/GetAll`,
            {
                observe: 'response',
                headers: this.headers,
            }
        );
    }

    getLabs(): Observable<HttpResponse<any>> {
        return this.http.get(`${this.baseApiUrl}api/registry/api/rvl/GetLabs`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getReportUnregedType(): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/report/api/Report/ReportUnregedType`,
            { observe: 'response', headers: this.headers }
        );
    }

    deleteDictionaryValueByKey(
        key: any,
        id: number
    ): Observable<HttpResponse<any>> {
        return this.http.delete(
            `${this.baseApiUrl}api/admin/api/${key}/Delete?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    // updateDictionaryValueByKey(key: any, data): Observable<HttpResponse<any>> {
    //     return this.http.put(
    //         `${this.baseApiUrl}api/admin/api/${key}/Update`,
    //         data,
    //         { observe: 'response', headers: this.headers }
    //     );
    // }

    addDictionaryValueByKey(key: any, data: any): Observable<HttpResponse<any>> {
        return this.http.post(`${this.baseApiUrl}api/admin/api/${key}/Add`, data, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getDicGender(key: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicGender/Get?type=${key}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getDictionaryMast(
        DirectionId: any,
        AnimalKindId: any
    ): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicMast/Get?AnimalKindId=${AnimalKindId}&DirectionId=${DirectionId}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getDicAgeGroup(
        Gender: any,
        AnimalKindId: any
    ): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicAgeGroup/Get?AnimalKindId=${AnimalKindId}&Gender=${Gender}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getAnimalDirection(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicDirection/Get?animalKindId=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getDicArea(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/DicArea/GetAreas?type=2`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getDoctors(lastName: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl
            }api/admin/api/Doctor?PageIndex=0&PageSize=30&Column=lastName&Search=${lastName || ''
            }`,
            { observe: 'response', headers: this.headers }
        );
    }

    getIndividuals(search: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl
            }api/admin/api/Individual/GetIndividuals?PageIndex=0&PageSize=30&Column=lastName&Search=${search || ''
            }`,
            { observe: 'response', headers: this.headers }
        );
    }

    getRvlReasons(): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicRvlReason/GetRvlReasons`,
            { observe: 'response', headers: this.headers }
        );
    }

    getRvlTubeReasons(): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicRvlReason/GetRvlTubeResult`,
            { observe: 'response', headers: this.headers }
        );
    }

    getAnimals(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/AnimalEditor/GetAnimals`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    updateAnimals(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/correction/api/Correction/CreateRequest`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getRequestCorrectionDetail(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/correction/api/Correction/GetRequestDetail?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getCorrectionsList(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/correction/api/Correction/GetListRequests`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getSignCorrectionData(id: string): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/correction/api/Correction/GetSignData?id=${id}`,
            {},
            { observe: 'response', headers: this.headers }
        );
    }

    getEventsOwnerRequestDetails(id: string): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/EventsOwner/GetRequestDetails?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    singingEventsOwner(signedData: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/EventsOwner/AddSignRequest`,
            signedData,
            { observe: 'response', headers: this.headers }
        );
    }

    getSignData(id: string): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/EventsOwner/GetSignData?id=${id}`,
            {},
            { observe: 'response', headers: this.headers }
        );
    }

    getRequestDetail(id: string): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/correction/api/Correction/GetRequestDetail?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getPermissionToEdit(animalId: string): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/correction/api/Correction/GetPermissionToEdit?animalId=${animalId}`,
            { observe: 'response', headers: this.headers }
        );
    }

    handleSignature = (data: any, id: string) => {
        const webSocket = new WebSocket('wss://127.0.0.1:13579/');
        const stringifyData = JSON.stringify(data);
        const xml = `<xml><correctionData>${stringifyData}</correctionData></xml>`;
        const signXml = {
            module: 'kz.gov.pki.knca.commonUtils',
            method: 'signXml',
            args: ['PKCS12', 'SIGNATURE', xml, '', ''],
        };
        webSocket.onopen = () => webSocket.send(JSON.stringify(signXml));
        webSocket.onmessage = (event) => {
            const result = JSON.parse(event.data);
            if (result !== null && result.code === '200') {
                this.singingRequest(id, result.responseObject);
            }
        };

        webSocket.onclose = (event) => {
            if (event.wasClean) {
            } else {
                alert('NCA Layer не запущен, Запустите NCA Layer и попробуйте снова');
            }
            return null;
        };
    };

    getListPepRequests(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/correction/api/Correction/GetListPepRequests`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getListEventOwners(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/EventsOwner/GetAllEventsOwner`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    accepted(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/EventsOwner/Accepted`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    rejected(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/EventsOwner/Rejected`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getRequestPepDetail(id: string): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/correction/api/Correction/GetRequestPepDetail?id=${id}`,
            { observe: 'response', headers: this.headers }
        );
    }
    singingRequest(id: string, sign: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/correction/api/Correction/AddSignRequest`,
            { id, sign },
            { observe: 'response', headers: this.headers }
        );
    }

    singingPepRequest(signedData: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/correction/api/Correction/AddSignPepRequest`,
            signedData,
            { observe: 'response', headers: this.headers }
        );
    }

    // getNotifications(data): Observable<HttpResponse<any>> {
    //     return this.http.post(
    //         `${this.baseApiUrl}api/lk/api/Notification/Notifications`,
    //         data,
    //         { observe: 'response', headers: this.headers }
    //     );
    // }

    setNotificationRead(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/lk/api/Notification/MarkAsRead`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    getReportTypes() {
        return this.http.get(`${this.baseApiUrl}api/report/api/Report/ReportType`, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getNotificationTypes() {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/DicNotificationType/GetNotificationTypes`,
            { observe: 'response', headers: this.headers }
        );
    }

    getAuthConfig() {
        return this.http.post(
            `${this.baseApiUrl}api/identity/getAuthConfig`,
            {},
            { observe: 'response', headers: this.headers }
        );
    }

    updateAuthConfig(data: any) {
        return this.http.post(`${this.baseApiUrl}api/identity/authConfig`, data, {
            observe: 'response',
            headers: this.headers,
        });
    }

    getAuthHistory(data: any) {
        return this.http.post<any>(
            `${this.baseApiUrl}api/lk/api/User/GetUserAuthHistory`,
            data,
            { observe: 'response', headers: this.headers }
        );
    }

    // eslint-disable-next-line class-methods-use-this
    //errorHandle(err) {
        /*    if (err.status === 401) {
              this.notification.error('Ошибка авторизации', 'Ваша сессия истелка, войдите в систему', {nzDuration: 0});
              this.router.navigate(['/']);
            }
            if (err.status === 403) {
              this.notification.error('Ошибка авторизации', 'Нехватает прав, для просмотра старницы, обратитесь к администратоу', {nzDuration: 0});
            }
            if (err.status !== 401 && err.status !== 401) {
              this.notification.error(err.message, '', {nzDuration: 0});
            } */
    //}

    getServerDate() {
        return this.http.get<any>(
            `${this.baseApiUrl}api/lk/api/User/GetDateAndTime`,
            { observe: 'response', headers: this.headers }
        );
    }

    //   getUserDetails(id) {
    //     return this.http.get(`${this.baseApiUrl}api/identity/getById?id=${id}`, {
    //       observe: 'response',
    //       headers: this.headers,
    //     });
    //   }

    getLimits(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/QuarantineLimit/Get`,
            data,
            {
                observe: 'response',
                headers: this.headers,
            }
        );
    }

    deleteLimit(id: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/QuarantineLimit/delete?id=${id}`,
            {
                observe: 'response',
                headers: this.headers,
            }
        );
    }
    updateLimit(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/QuarantineLimit/update`,
            data,
            {
                observe: 'response',
                headers: this.headers,
            }
        );
    }
    addLimit(data: any): Observable<HttpResponse<any>> {
        return this.http.post(
            `${this.baseApiUrl}api/admin/api/QuarantineLimit/add`,
            data,
            {
                observe: 'response',
                headers: this.headers,
            }
        );
    }

    //   getQuarantineList(id, data: any): Observable<HttpResponse<any>> {
    //     return this.http.post(
    //       `${this.baseApiUrl}api/admin/api/QuarantineLimit/GetQuarantineOwnerAnimals?quarantineLimitId=${id}`,
    //       data,
    //       {
    //         observe: 'response',
    //         headers: this.headers,
    //       }
    //     );
    //   }

    getDeadlineDate(params: any): Observable<any> {
        return this.http.get(
            `${this.baseApiUrl}api/admin/api/Calendar/GetLastWorkingDay`,
            {
                params,
                observe: 'response',
                headers: this.headers,
            }
        );
    }

    getPhysicalIndividualByIinAndOpf(
        iin: string,
        opfOpfId: number
    ): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}/api/admin/api/Individual/GetPhysicalIndividualByIinAndOpf?iin=${iin}&opfId=${opfOpfId}`,
            { observe: 'response', headers: this.headers }
        );
    }

    getVetPassportRequestList(params: any): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/registry/api/VatPassport/GetRequestList`,
            { observe: 'response', headers: this.headers, params }
        );
    }

    getVetPassportRequest(
        id: number,
        culture: number
    ): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.baseApiUrl}api/registry/api/VatPassport/GetById?id=${id}&culture=${culture}`,
            { observe: 'response', headers: this.headers }
        );
    }
}
