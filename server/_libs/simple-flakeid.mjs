import { t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/.pnpm/simple-flakeid@0.0.5/node_modules/simple-flakeid/lib/src/snowflakeIdv1.js
var require_snowflakeIdv1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SnowflakeIdv1 = void 0;
	/**
	*
	*/
	var SnowflakeIdv1 = class {
		/**
		*Creates an instance of Genid.
		* @author zhupengfeivip
		* @param {{
		*     BaseTime: 1577836800000,  // 基础时间（ms 单位），默认2020年1月1日，不能超过当前系统时间，一旦投入使用就不能再更改，更改后产生的ID可能会和以前的重复
		*     WorkerId: Number, // 机器码，必须由外部设定，最大值 2^WorkerIdBitLength-1
		*     WorkerIdBitLength: 6,   // 机器码位长，默认值 6，取值范围 [1, 15](要求：序列数位长+机器码位长不超过 22)
		*     SeqBitLength: 6,   // 序列数位长，默认值 6，取值范围 [3, 21](要求：序列数位长+机器码位长不超过 22)
		*     MaxSeqNumber: 5, // 最大序列数（含），设置范围 [MinSeqNumber, 2^SeqBitLength-1]，默认值 0，表示最大序列数取最大值（2^SeqBitLength-1]）
		*     MinSeqNumber: 5, // 最小序列数（含），默认值 5，取值范围 [5, MaxSeqNumber]，每毫秒的前 5 个序列数对应编号 0-4 是保留位，其中 1-4 是时间回拨相应预留位，0 是手工新值预留位
		*     TopOverCostCount: 2000// 最大漂移次数（含），默认 2000，推荐范围 500-10000（与计算能力有关）
		* }} options
		* @memberof Genid
		*/
		constructor(options) {
			if (options.workerId === void 0) throw new Error("lost WorkerId");
			const BaseTime = 15778368e5;
			if (!options.baseTime || options.baseTime < 0) options.baseTime = BaseTime;
			const WorkerIdBitLength = 6;
			if (!options.workerIdBitLength || options.workerIdBitLength < 0) options.workerIdBitLength = WorkerIdBitLength;
			const SeqBitLength = 6;
			if (!options.seqBitLength || options.seqBitLength < 0) options.seqBitLength = SeqBitLength;
			if (options.maxSeqNumber == void 0 || options.maxSeqNumber <= 0) options.maxSeqNumber = (1 << SeqBitLength) - 1;
			const MinSeqNumber = 5;
			if (options.minSeqNumber == void 0 || options.minSeqNumber < 0) options.minSeqNumber = MinSeqNumber;
			const topOverCostCount = 2e3;
			if (options.topOverCostCount == void 0 || options.topOverCostCount < 0) options.topOverCostCount = topOverCostCount;
			if (options.method !== 2) options.method = 1;
			else options.method = 2;
			this.Method = BigInt(options.method);
			this.BaseTime = BigInt(options.baseTime);
			this.WorkerId = BigInt(options.workerId);
			this.WorkerIdBitLength = BigInt(options.workerIdBitLength);
			this.SeqBitLength = BigInt(options.seqBitLength);
			this.MaxSeqNumber = BigInt(options.maxSeqNumber);
			this.MinSeqNumber = BigInt(options.minSeqNumber);
			this.TopOverCostCount = BigInt(options.topOverCostCount);
			const timestampShift = this.WorkerIdBitLength + this.SeqBitLength;
			const currentSeqNumber = this.MinSeqNumber;
			this._TimestampShift = timestampShift;
			this._CurrentSeqNumber = currentSeqNumber;
			this._LastTimeTick = BigInt(0);
			this._TurnBackTimeTick = BigInt(0);
			this._TurnBackIndex = 0;
			this._IsOverCost = false;
			this._OverCostCountInOneTerm = 0;
		}
		/**
		* 当前序列号超过最大范围，开始透支使用序号号的通知事件，，本项暂未实现
		* @returns
		*/
		BeginOverCostAction(useTimeTick) {}
		/**
		* 当前序列号超过最大范围，结束透支使用序号号的通知事件，，本项暂未实现
		* @returns
		*/
		EndOverCostAction(useTimeTick) {}
		/**
		* 开始时间回拨通知，本项暂未实现
		* @returns
		*/
		BeginTurnBackAction(useTimeTick) {}
		/**
		* 结束时间回拨通知，本项暂未实现
		* @returns
		*/
		EndTurnBackAction(useTimeTick) {}
		/**
		* 雪花漂移算法
		* @returns
		*/
		NextOverCostId() {
			const currentTimeTick = this.GetCurrentTimeTick();
			if (currentTimeTick > this._LastTimeTick) {
				this.EndOverCostAction(currentTimeTick);
				this._LastTimeTick = currentTimeTick;
				this._CurrentSeqNumber = this.MinSeqNumber;
				this._IsOverCost = false;
				this._OverCostCountInOneTerm = 0;
				return this.CalcId(this._LastTimeTick);
			}
			if (this._OverCostCountInOneTerm >= this.TopOverCostCount) {
				this.EndOverCostAction(currentTimeTick);
				this._LastTimeTick = this.GetNextTimeTick();
				this._CurrentSeqNumber = this.MinSeqNumber;
				this._IsOverCost = false;
				this._OverCostCountInOneTerm = 0;
				return this.CalcId(this._LastTimeTick);
			}
			if (this._CurrentSeqNumber > this.MaxSeqNumber) {
				this._LastTimeTick++;
				this._CurrentSeqNumber = this.MinSeqNumber;
				this._IsOverCost = true;
				this._OverCostCountInOneTerm++;
				return this.CalcId(this._LastTimeTick);
			}
			return this.CalcId(this._LastTimeTick);
		}
		/**
		* 常规雪花算法
		* @returns
		*/
		NextNormalId() {
			const currentTimeTick = this.GetCurrentTimeTick();
			if (currentTimeTick < this._LastTimeTick) {
				if (this._TurnBackTimeTick < 1) {
					this._TurnBackTimeTick = this._LastTimeTick - BigInt(1);
					this._TurnBackIndex++;
					if (this._TurnBackIndex > 4) this._TurnBackIndex = 1;
					this.BeginTurnBackAction(this._TurnBackTimeTick);
				}
				return this.CalcTurnBackId(this._TurnBackTimeTick);
			}
			if (this._TurnBackTimeTick > 0) {
				this.EndTurnBackAction(this._TurnBackTimeTick);
				this._TurnBackTimeTick = BigInt(0);
			}
			if (currentTimeTick > this._LastTimeTick) {
				this._LastTimeTick = currentTimeTick;
				this._CurrentSeqNumber = this.MinSeqNumber;
				return this.CalcId(this._LastTimeTick);
			}
			if (this._CurrentSeqNumber > this.MaxSeqNumber) {
				this.BeginOverCostAction(currentTimeTick);
				this._LastTimeTick++;
				this._CurrentSeqNumber = this.MinSeqNumber;
				this._IsOverCost = true;
				this._OverCostCountInOneTerm = 1;
				return this.CalcId(this._LastTimeTick);
			}
			return this.CalcId(this._LastTimeTick);
		}
		/**
		* 生成ID
		* @param useTimeTick 时间戳
		* @returns
		*/
		CalcId(useTimeTick) {
			const result = BigInt(useTimeTick << this._TimestampShift) + BigInt(this.WorkerId << this.SeqBitLength) + BigInt(this._CurrentSeqNumber);
			this._CurrentSeqNumber++;
			return result;
		}
		/**
		* 生成时间回拨ID
		* @returns
		*/
		CalcTurnBackId(useTimeTick) {
			const result = BigInt(useTimeTick << this._TimestampShift) + BigInt(this.WorkerId << this.SeqBitLength) + BigInt(this._TurnBackIndex);
			this._TurnBackTimeTick--;
			return result;
		}
		/**
		*
		* @returns
		*/
		GetCurrentTimeTick() {
			return BigInt((/* @__PURE__ */ new Date()).valueOf()) - this.BaseTime;
		}
		/**
		*
		* @returns
		*/
		GetNextTimeTick() {
			let tempTimeTicker = this.GetCurrentTimeTick();
			while (tempTimeTicker <= this._LastTimeTick) tempTimeTicker = this.GetCurrentTimeTick();
			return tempTimeTicker;
		}
		/**
		* 生成ID
		* @returns 始终输出number类型，超过时throw error
		*/
		NextNumber() {
			if (this._IsOverCost) {
				let id = this.NextOverCostId();
				if (id >= 9007199254740992n) throw Error(`${id.toString()} over max of Number 9007199254740992`);
				return parseInt(id.toString());
			} else {
				let id = this.NextNormalId();
				if (id >= 9007199254740992n) throw Error(`${id.toString()} over max of Number 9007199254740992`);
				return parseInt(id.toString());
			}
		}
		/**
		* 生成ID
		* @returns 根据输出数值判断，小于number最大值时输出number类型，大于时输出bigint
		*/
		NextId() {
			if (this._IsOverCost) {
				let id = this.NextOverCostId();
				if (id >= 9007199254740992n) return id;
				else return parseInt(id.toString());
			} else {
				let id = this.NextNormalId();
				if (id >= 9007199254740992n) return id;
				else return parseInt(id.toString());
			}
		}
		/**
		* 生成ID
		* @returns 始终输出bigint类型
		*/
		NextBigId() {
			if (this._IsOverCost) return this.NextOverCostId();
			else return this.NextNormalId();
		}
	};
	exports.SnowflakeIdv1 = SnowflakeIdv1;
}));
//#endregion
//#region node_modules/.pnpm/simple-flakeid@0.0.5/node_modules/simple-flakeid/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SnowflakeIdv1 = void 0;
	var snowflakeIdv1_1 = require_snowflakeIdv1();
	Object.defineProperty(exports, "SnowflakeIdv1", {
		enumerable: true,
		get: function() {
			return snowflakeIdv1_1.SnowflakeIdv1;
		}
	});
}));
//#endregion
export { require_lib as t };
