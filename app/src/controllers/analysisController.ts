import AnalysisService from "../services/AnalysisService"
import AnalysisError from '../errors/analysis/Analysis'
import {Analysis} from "../entity/analysis/Analysis";

class AnalysisController {
    private analysisService: AnalysisService

    constructor() {
        this.analysisService = new AnalysisService()
    }

    getBy_All = async (request: any, response: any) => {
        console.log("OKOKOOOK")
        try {
            const analysis = await this.analysisService.getByAll(request.user.id)
            response.status(200).send(analysis)
        } catch (error: any) {
            response.status(404).send({
                "error": error.message
            })
        }

    }
    getBy_Id = async (request: any, response: any) => {
        // получение информации только своих анализов
        try {
            const analysis = await this.analysisService.getById(request.user.id, request.params.id)
            response.status(200).send(analysis)
        } catch (error) {
            response.status(404).send({
                "error": error
            })
        }
    }
    getBy_Title = async (request: any, response: any) => {
        try {
            const analysis: Analysis[] = await this.analysisService.getByTitle(
                Number(request.user.id),
                String(request.body.title)
                )
            console.log("OKOKKOKOOK", analysis)
            response.status(200).send(analysis)
        } catch (error) {
            response.status(404).send({
                "error": error
            })
        }
    }

    create = async (request: any, response: any) => {
        try {
            const analysis = await this.analysisService.create( request.user.id,request.body);
            // @ts-ignore
            delete analysis['user']
            response.status(200).send(analysis);
        } catch (error) {
            response.status(400).send({
                "error": error
            })
        }
    }
    delete = async (request: any, response: any) => {
        await this.analysisService.delete(Number(request.user.id), Number(request.params.id)).then(_ =>{
            response.status(200).send({"status": 'Analysis deleted'});
        }).catch(err => {
            response.status(404).send({"error": err})
        })
    }

    update = async (request: any, response: any) => {
        await this.analysisService.update(request.user.id, request.params.id, request.body, request.user).then(analysis =>{
            response.status(200).send(analysis);
        }).catch(error => {
            response.status(400).send({
                "error": error
            })
        });
    }

}
export default AnalysisController