"use client";

import { CartoonButton } from "@/components/ui/cartoon-button";
import { parseEther, formatEther } from 'ethers'
import { useState, useEffect } from "react";
import { useAccount, useBalance, useWriteContract, useReadContract } from "wagmi";

import { GamePoolInvestmentAbi } from "@/lib/abi";


export default function Games() {
  const [investInput, setInvestInput] = useState(0)
  const [withdrawInput, setWithdrawInput] = useState(0)

  const contractAddress = "0xCb34fC63d33152aA874785507Cb11A6bDE17fC49"
  const { address } = useAccount();
  const { data: balance, status: balanceStatus, refetch: balanceRefetch } = useBalance({ address: address })
  const { writeContract, status: writeStatus } = useWriteContract()
  const { data: tokenBalance, status: tokenBalanceStatus, refetch: tokenBalanceRefetch } = useReadContract({
    abi: GamePoolInvestmentAbi,
    address: contractAddress,
    functionName: 'balanceOf',
    args: [address ?? "0xB2A3c4b0253cD39717ad72B636631D018917B670"],
  })
  const { data: contractBalance, refetch: contractBalanceRefetch } = useReadContract({
    abi: GamePoolInvestmentAbi,
    address: contractAddress,
    functionName: 'balance',
  })

  useEffect(() => {
    if (writeStatus == "success") {
      setInvestInput(0)
      setWithdrawInput(0)
      tokenBalanceRefetch()
      balanceRefetch()
      contractBalanceRefetch()
    }
  }, [writeStatus])

  function handleInvest() {
    if (Number(investInput) == 0) return;

    writeContract({
      abi: GamePoolInvestmentAbi,
      address: contractAddress,
      functionName: 'invest',
      args: [],
      value: parseEther(investInput.toString()),
    })
  }

  function handleWithdraw() {
    if (Number(withdrawInput) == 0) return;

    writeContract({
      abi: GamePoolInvestmentAbi,
      address: contractAddress,
      functionName: 'withdraw',
      args: [parseEther(withdrawInput.toString())],
    })
  }

  return (
    <div className="">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Coin Flip Investor Pool
        </h1>

        <div className="w-8/12 mx-auto p-4 gap-3 flex flex-col rounded-3xl border-2 border-translucent-light-4 bg-translucent-dark-12 backdrop-blur-[60px]">
          <div className="flex p-4 gap-5 items-center rounded-2xl border-2 border-translucent-light-4 bg-translucent-light-12">
            <div>
              <p className="text-translucent-light-64 text-body2 font-bold text-lg">
                Investment Pool
              </p>
              <p className="text-light-primary text-h5 text-4xl font-body-2 font-[600]">
                {formatEther(contractBalance ?? 0)} STT
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="flex p-4 gap-5 items-center rounded-2xl border-2 border-translucent-light-4 bg-translucent-light-12">
              <div>
                <p className="text-translucent-light-64 text-body2 font-bold text-lg">
                  Dynamic APY ( per game )
                </p>
                <p className="text-light-primary text-h5 text-4xl font-body-2 font-[600]">
                  0.005 STT
                </p>
              </div>
            </div>
            <div className="flex p-4 gap-5 items-center rounded-2xl border-2 border-translucent-light-4 bg-translucent-light-12">
              <div>
                <p className="text-translucent-light-64 text-body2 font-bold text-lg">
                  Your Stake
                </p>
                <p className="text-light-primary text-h5 text-4xl font-body-2 font-[600]">
                  {tokenBalanceStatus == "pending" ? "..." : formatEther(BigInt(tokenBalance ?? 0))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-7/12 mx-auto grid grid-cols-2 gap-x-6 mt-6">
          <div className="p-5 rounded-3xl border-2 border-translucent-light-4 bg-translucent-dark-12 backdrop-blur-[60px]">
            {balanceStatus == "pending" && (
              <div className="flex items-center justify-center h-full">
                <p className="text-white">Loading</p>
              </div>
            )}
            {balanceStatus == "success" && (
              <div className="py-5 flex flex-col items-center gap-y-3 rounded-2xl border-2 border-translucent-light-4 bg-translucent-light-12">
                <label className="font-bold text-white text-xl">Invest STT Amount</label>
                <input type="number" value={investInput} onChange={(e) => {
                  if (!balance) return;

                  const value = e.target.value

                  setInvestInput(Number(value))
                }} className="text-white text-2xl w-8/12 border-2 rounded-full text-center p-2" />
                {writeStatus == "pending" ? (
                  <p className="text-white">Loading</p>
                ) : (
                  <CartoonButton
                    className="w-11/12"
                    size={"lg"}
                    variant={"primary"}
                    onClick={() => handleInvest()}
                  >
                    <p className="text-dark-primary">Invest</p>
                  </CartoonButton>
                )}
              </div>
            )}
          </div>
          <div className="p-5 rounded-3xl border-2 border-translucent-light-4 bg-translucent-dark-12 backdrop-blur-[60px]">
            {balanceStatus == "pending" && (
              <div className="flex items-center justify-center h-full">
                <p className="text-white">Loading</p>
              </div>
            )}
            {balanceStatus == "success" && (
              <div className="py-5 flex flex-col items-center gap-y-3 rounded-2xl border-2 border-translucent-light-4 bg-translucent-light-12">
                <label className="font-bold text-white text-xl">Withdraw STT Amount</label>
                <input type="number" value={withdrawInput} onChange={(e) => {
                  if (!tokenBalance) return;

                  const value = e.target.value
                  if (value == "") return;

                  setWithdrawInput(Number(value))
                }} className="text-white text-2xl w-8/12 border-2 rounded-full text-center p-2" />
                {writeStatus == "pending" ? (
                  <p className="text-white">Loading</p>
                ) : (
                  <CartoonButton
                    className="w-11/12"
                    size={"lg"}
                    variant={"primary"}
                    onClick={() => handleWithdraw()}
                  >
                    <p className="text-dark-primary">Withdraw</p>
                  </CartoonButton>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
