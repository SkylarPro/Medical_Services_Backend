import {Analysis} from "../entity/analysis/Analysis";
import {AppDataSource} from "../dataSource/data-source";
import {User} from "../entity/user/User";
import AnalysisError from "../errors/analysis/Analysis";
import UserService from "./UserService";
import {validate} from "class-validator";
import UserError from "../errors/users/User";


class AnalysisService {
    public  userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    public async getByAll(userId:number): Promise<Analysis[] | Analysis> {
        console.log(userId)
        return await AppDataSource.getRepository(User).findOneOrFail({ where: { id: userId }, relations: {
                analysis: true,
            } }).then(user => {
                if (user.analysis.length > 0) {
                    return user.analysis
                }else{
                    throw new AnalysisError(`Analysis does not exist`);
                }
        }).catch(err => {
            throw new AnalysisError(err);
        });
    }
    public async getByTitle(userId:number, title: string): Promise<Analysis[]> {
        return await AppDataSource.getRepository(Analysis).find({ where: {title: title }, relations: {
                user: true,
            } }).then(analysis => {

            analysis = analysis.filter((analys) => analys.user.id === userId)
            if (analysis.length == 0){
                throw String(new AnalysisError(`Analysis (title=${title}) does not exist`))
            }
            for (let i = 0; i < analysis.length; i++) {
                // @ts-ignore
                delete analysis[i]['user']
            }
            return analysis
        }).catch(err => {
            throw String(new AnalysisError(err))
        });
    }

    public async getById(userId:number, id: number): Promise<Analysis> {
        return await AppDataSource.getRepository(Analysis).findOneOrFail({ where: { id: id }, relations: {
                user: true,
            } }).then(analysis => {
                if (analysis.user.id === userId){
                    // @ts-ignore
                    delete analysis['user']
                    return analysis
                }else{
                    throw String(new AnalysisError(`Analysis (id=${id}) does not exist`))
                }
        }).catch(err => {
            throw String(new AnalysisError(err))
        });
    }

    async create(userId:number, analysisData: Analysis):Promise<Analysis>  {
        try{
            const repo_analysis = await AppDataSource.getRepository(Analysis)
            const repo_user = await AppDataSource.getRepository(User)
            const user = await this.userService.getById(userId,true)

            const analysis = await repo_analysis.create(analysisData)

            analysis.user = user
            // @ts-ignore
            user.analysis.push(analysis)

            let errors_analysis = await validate(analysis);
            let errors_user = await validate(user)

            if (errors_analysis.length > 0) {
                throw String(new UserError(String(errors_analysis)))
            }
            if (errors_user.length > 1) {
                //password code more than 8 chars
                throw String(new UserError(String(errors_user)))
            }

            console.log(analysis)


            await repo_analysis.save(analysis)
            await repo_user.save(user)

            return analysis
        }catch (err){
            throw String(new AnalysisError(String(err)))
        }
    }
    async delete(userId:number, id: number): Promise<AnalysisError | void>{
        await this.getById(userId, id).then(async analysis => {
            await AppDataSource.getRepository(Analysis).remove(analysis)
        }).catch(err =>{
            throw String(new AnalysisError(err))
        })
    }

    async update(userId:number, id:number, analysisData: Analysis, userData: User): Promise<Analysis>{
        try{
            await this.getById(userId, id);
            const repo_analysis = await AppDataSource.getRepository(Analysis)
            const analysis = await repo_analysis.create(analysisData)
            analysis['id'] = id
            analysis.user = userData

            const errors_analysis: any = await validate(analysis);
            if (errors_analysis.length > 0) {
                throw String(new UserError(errors_analysis))
            }
            await repo_analysis.createQueryBuilder().update(analysis).where({
                id: analysis.id,
            }).execute()
            // @ts-ignore
            delete analysis['user']
            return analysis
        }catch (err: any){
            throw String(new AnalysisError(err))
        }

    }
}

export default AnalysisService